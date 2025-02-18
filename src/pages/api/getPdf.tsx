import path from "path";
import { getPdfJson } from "../../helpers";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    res.status(200).json(
      JSON.stringify({
        data: await getPdfJson(path.resolve("./public", "Terren_Resume.pdf")),
      })
    );
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: "Server error occured." });
  }
}
