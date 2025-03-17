import { revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const tag = req.nextUrl.searchParams.get("tag");
    if (!tag) return Response.json({ revalidated: false, status: 500 });
    revalidateTag(tag);
    return Response.json({ revalidated: true, status: 200 });
  } catch (error) {
    console.log("Could not invalidate cache: ", error);
    return Response.json({ revalidated: false, status: 500 });
  }
}
