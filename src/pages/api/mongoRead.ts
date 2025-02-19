import { unstable_cache } from "next/cache";
import { connectToDatabase } from "../../lib/mongodb";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { searchParams } = new URL(req.url!, `http://${req.headers.host}`);
    const collectionName = searchParams.get("collection");

    if (!collectionName) {
      return res.json({
        success: false,
        error: "Collection name is required",
        status: 400,
      });
    }

    const filters: Record<string, unknown> = {};
    searchParams.forEach((value, key) => {
      if (key !== "collection") filters[key] = value;
    });

    const tags = [
      `mongoRead`,
      `${collectionName}`,
      `${String(filters.title).toLowerCase()}`,
    ];

    const readMongoDB = unstable_cache(
      async () => {
        const { db } = await connectToDatabase();
        return await db.collection(collectionName).find(filters).toArray();
      },
      [],
      {
        revalidate: 3600,
        tags,
      }
    );

    const results = await readMongoDB();

    if (!results.length) {
      return res.json({
        success: false,
        error: "No documents found",
        status: 404,
      });
    }

    return res.json({ success: true, data: results, status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return res.json({
      success: false,
      error: "Internal Server Error",
      status: 500,
    });
  }
}
