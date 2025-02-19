import { revalidateTag } from "next/cache";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const tag = new URL(
      req.url!,
      `http://${req.headers.host}`
    ).searchParams.get("tag");
    if (!tag) return res.json({ revalidated: false, status: 500 });
    revalidateTag(tag);
    return res.json({ revalidated: true, status: 200 });
  } catch (error) {
    console.log("Could not invalidate cache: ", error);
    return res.json({ revalidated: false, status: 500 });
  }
}
