import {
	S3Client,
	HeadObjectCommand,
	GetObjectCommand,
} from "@aws-sdk/client-s3";
import {
	createWriteStream,
	createReadStream,
	existsSync,
	mkdirSync,
	writeFileSync,
	readFileSync,
} from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { Extract } from "unzipper";
import { pipeline } from "stream/promises";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

const R2_BUCKET = "unity";
const zipFileName = "Unity.zip";
const etagPath = "scripts/.etag";

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
		const unityDir = "public/";
		if (!existsSync(unityDir)) mkdirSync(unityDir, { recursive: true });

		await pipeline(createReadStream(zipPath), Extract({ path: unityDir }));

		writeFileSync(etagPath, remoteEtag);
		console.log("✅ Unity deployed and .etag updated.");
	} catch (err) {
		console.error("❌ Unexpected error during deployUnity:", err);
		process.exit(1);
	}
}

deployUnity();
