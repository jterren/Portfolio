import { revalidateTag } from "next/cache";
import { NextApiRequest } from "next";

export async function POST(req: NextApiRequest) {
  try {
    const tag = new URL(
      req.url!,
      `http://${req.headers.host}`
    ).searchParams.get("tag");
    if (!tag) return Response.json({ revalidated: false, status: 500 });
    revalidateTag(tag);
    return Response.json({ revalidated: true, status: 200 });
  } catch (error) {
    console.log("Could not invalidate cache: ", error);
    return Response.json({ revalidated: false, status: 500 });
  }
}
