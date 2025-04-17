import {
	S3Client,
	HeadObjectCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import { rm } from "node:fs/promises";
import { tmpdir } from "os";
import { join } from "path";
import { Extract } from "unzipper";
import { pipeline } from "stream/promises";
import dotenv from "dotenv";
import {
	existsSync,
	readFileSync,
	createWriteStream,
	createReadStream,
	writeFileSync,
} from "node:fs";

// Load .env variables
dotenv.config();

const R2_BUCKET = "unity";
const zipFileName = "unity.zip";
const etagPath = "scripts/wilting.etag";

const s3 = new S3Client({
	region: "auto",
	endpoint: process.env.R2_ENDPOINT!,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
});

async function deployUnity() {
	try {
		console.log("🔍 Checking ETag from R2...");
		const headCommand = new HeadObjectCommand({
			Bucket: R2_BUCKET,
			Key: zipFileName,
		});
		const headResult = await s3.send(headCommand);
		const remoteEtag = headResult.ETag?.replace(/"/g, "") ?? "";

		const localEtag = existsSync(etagPath)
			? readFileSync(etagPath, "utf-8")
			: "";
		console.log(`Local etag: ${localEtag}, remote etag: ${remoteEtag}`);
		if (remoteEtag === localEtag) {
			console.log("✅ Unity files are up-to-date, skipping download.");
			return;
		}

		console.log("⬇️ Downloading Unity.zip from R2...");
		const getCommand = new GetObjectCommand({
			Bucket: R2_BUCKET,
			Key: zipFileName,
		});
		const { Body } = await s3.send(getCommand);
		const zipPath = join(tmpdir(), zipFileName);
		const fileStream = createWriteStream(zipPath);
		await pipeline(Body as NodeJS.ReadableStream, fileStream);

		console.log("📦 Extracting Unity.zip...");
		const resourceDir = "public/";
		const unityDir = `${resourceDir}Unity`;
		if (existsSync(unityDir))
			await rm(unityDir, { recursive: true, force: true });

		await pipeline(createReadStream(zipPath), Extract({ path: resourceDir }));

		writeFileSync(etagPath, remoteEtag);
		console.log("✅ Unity deployed and .etag updated.");
	} catch (err) {
		console.error("❌ Unexpected error during deployUnity:", err);
		process.exit(1);
	}
}

deployUnity();
