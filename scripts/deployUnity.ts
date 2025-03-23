import {
	S3Client,
	HeadObjectCommand,
	GetObjectCommand,
	ListObjectsV2Command,
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
import { pipeline } from "stream/promises";
import * as unzipper from "unzipper";
import * as dotenv from "dotenv";
dotenv.config();

// Validate environment variables
const requiredEnv = ["R2_ENDPOINT", "R2_ACCESS_KEY_ID", "R2_SECRET_ACCESS_KEY"];
for (const envVar of requiredEnv) {
	if (!process.env[envVar]) {
		console.error(`❌ Missing environment variable: ${envVar}`);
		process.exit(1);
	}
}

const R2_BUCKET = "unity";
const zipFileName = "Unity.zip";
const etagPath = "scripts/.etag";

const config = {
	region: "auto",
	endpoint: process.env.R2_ENDPOINT!,
	credentials: {
		accessKeyId: process.env.R2_ACCESS_KEY_ID!,
		secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
	},
};

const s3 = new S3Client(config);

async function deployUnity() {
	try {
		console.log("🔍 Starting deployUnity...");
		console.log("📦 Checking for Unity.zip in R2 bucket:", R2_BUCKET);

		// Debug: List all files in the bucket
		const listCommand = new ListObjectsV2Command({ Bucket: R2_BUCKET });
		const listResult = await s3.send(listCommand);
		const fileNames = listResult.Contents?.map((obj) => obj.Key) || [];
		console.log("🗂️ Files in R2 bucket:", fileNames);

		// Check if Unity.zip exists using HeadObjectCommand
		let remoteEtag = "";
		try {
			const headCommand = new HeadObjectCommand({
				Bucket: R2_BUCKET,
				Key: zipFileName,
			});
			const headResult = await s3.send(headCommand);
			remoteEtag = headResult.ETag?.replace(/"/g, "") ?? "";
			console.log("✅ Found Unity.zip with ETag:", remoteEtag);
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
		} catch (error: any) {
			if (
				error.name === "NotFound" ||
				error.$metadata?.httpStatusCode === 404
			) {
				console.error(
					`❌ File "${zipFileName}" not found in bucket "${R2_BUCKET}".`
				);
			} else {
				console.error("❌ Failed to check Unity.zip:", error);
			}
			process.exit(1);
		}

		const localEtag = existsSync(etagPath)
			? readFileSync(etagPath, "utf-8")
			: "";
		console.log("📄 Local ETag:", localEtag);

		if (remoteEtag === localEtag) {
			console.log("✅ Unity files are up-to-date. Skipping download.");
			return;
		}

		// Download Unity.zip
		console.log("⬇️ Downloading Unity.zip...");
		const getCommand = new GetObjectCommand({
			Bucket: R2_BUCKET,
			Key: zipFileName,
		});
		const { Body } = await s3.send(getCommand);

		const zipPath = join(tmpdir(), zipFileName);
		await pipeline(Body as NodeJS.ReadableStream, createWriteStream(zipPath));
		console.log(`📁 Downloaded Unity.zip to ${zipPath}`);

		// Extract Unity.zip
		const unityDir = "public/";
		if (!existsSync(unityDir)) {
			mkdirSync(unityDir, { recursive: true });
			console.log("📂 Created directory:", unityDir);
		}

		console.log("📦 Extracting Unity.zip...");
		await pipeline(
			createReadStream(zipPath),
			unzipper.Extract({ path: unityDir })
		);
		console.log("✅ Extraction complete.");

		// Update ETag
		writeFileSync(etagPath, remoteEtag);
		console.log("📝 Updated local .etag with ETag:", remoteEtag);
	} catch (err) {
		console.error("❌ Unexpected error during deployUnity:", err);
		process.exit(1);
	}
}

deployUnity();
