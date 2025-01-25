import PDFParser, { Output } from "pdf2json";

export const getPdfJson = (filePath: string) =>
  new Promise<Output>(async (res, rej) => {
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
        res(pdfData);
      });

      pdfParser.loadPDF(filePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      rej(genericError);
    }
  });
