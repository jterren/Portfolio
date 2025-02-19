import path from "path";
import { getPdfJson } from "../../helpers";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_cache } from "next/cache";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const fileName = process.env.NEXT_PUBLIC_CURRENT_RESUME;
    const tags = [`files`, String(fileName).toLowerCase()];
    const pdfData = unstable_cache(
      async () => {
        return await getPdfJson(
          path.resolve("./public", fileName || "Terren_Resume.pdf")
        );
      },
      [],
      {
        revalidate: 3600,
        tags,
      }
    );
    res.status(200).json({
      data: await pdfData(),
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Server error occured." });
  }
}
