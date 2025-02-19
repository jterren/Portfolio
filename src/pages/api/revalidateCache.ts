import { revalidateTag } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tag = new URL(req.url || "").searchParams.get("tag");
    if (!tag) return res.json({ revalidated: false, status: 500 });
    revalidateTag(tag);
    return res.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    console.log("Could not invalidate cache: ", error);
    return res.json({ revalidated: false, status: 500 });
  }
}
