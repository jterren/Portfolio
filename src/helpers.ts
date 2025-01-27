import PDFParser from "pdf2json";

export const getPdfJson = (filePath: string) =>
  new Promise<string>(async (res, rej) => {
    const genericError = "Error loading file...";
    try {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData) => {
        console.error(errData.parserError);
        rej(genericError);
      });
      pdfParser.on("pdfParser_dataReady", (pdfData) => {
        if (pdfData == null) {
          rej(genericError);
        }

        const pages: string[] = [];

        pdfData.Pages.map(async (x) => {
          let lines: string[] = [];
          x.Texts.map((cur) => {
            if (cur.R[0].T != "%20")
              lines.push(`${decodeURIComponent(cur.R[0].T)}\n`);
          });
          pages.push(lines.toString());
          lines = [];
        });
        res(JSON.stringify(pdfData.Pages));
      });

      pdfParser.loadPDF(filePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      rej(genericError);
    }
  });
