import { getPdfJson } from "@/helpers";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const data = JSON.stringify(getPdfJson("./public/Example.pdf"));

  const html = <></>;

  res.status(200).json({ message: html });
}
