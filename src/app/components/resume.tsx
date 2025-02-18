import { ReactElement } from "react";
import pdfToHtml from "./pdfToHtml";

export const resumeHTML = (data: PDFLine[]) =>
  new Promise<ReactElement>(async (res, rej) => {
    try {
      res(<div>{pdfToHtml({ lines: data })}</div>);
    } catch (err) {
      console.log(err);
      rej(
        <div id="failed">
          <p>Error constructing HTML from PDF</p>
        </div>
      );
    }
  });
