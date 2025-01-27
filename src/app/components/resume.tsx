import { ReactElement } from "react";
import pdfToHtml from "./pdfToHtml";

export const resumeHTML = (data: string) =>
  new Promise<ReactElement>(async (res, rej) => {
    try {
      res(<div>{pdfToHtml({ pages: JSON.parse(data) })}</div>);
    } catch (err) {
      console.log(err);
      rej(
        <div id="failed">
          <p>Error constructing HTML from PDF</p>
        </div>
      );
    }
  });
