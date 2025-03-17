import PDFParser, { Page } from "pdf2json";

export const getPdfJson = (filePath: string) =>
  new Promise<PDFLine[]>(async (res, rej) => {
    const genericError = "Error loading file...";
    try {
      const pdfParser = new PDFParser();

      pdfParser.on("pdfParser_dataError", (errData) => {
        console.error(errData.parserError);
        rej(genericError);
      });
      pdfParser.on("pdfParser_dataReady", async (pdfData) => {
        if (pdfData == null) {
          rej(genericError);
        }
        res(await parsePages(pdfData.Pages));
      });

      pdfParser.loadPDF(filePath);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      console.log(err);
      rej(genericError);
    }
  });

export const parsePages = (pages: Page[]) =>
  new Promise<PDFLine[]>(async (res, rej) => {
    try {
      let line: PDFLine = {
        texts: [],
        y: -1,
      };

      const lines: PDFLine[] = [];

      pages.forEach((page) => {
        page.Texts.forEach((textObj) => {
          const decodedText = decodeURIComponent(
            textObj.R.map((r) => r.T).join("")
          );

          if (line.y == -1) {
            line.y = textObj.y;
          }

          if (line.y < textObj.y) {
            lines.push(line);
            line = {
              texts: [],
              y: textObj.y,
            };
          }

          line.texts.push({
            text: decodedText,
            x: textObj.x,
            formatting: {
              fontSize: textObj.R[0].TS[1],
              isBold: textObj.R[0].TS[2] === 1,
              isItalic: textObj.R[0].TS[2] === 1,
              align: textObj.A || "left",
            },
          });
        });
        lines.push(line);
      });

      res(lines);
    } catch (err) {
      console.log(err);
      rej("Error parsing file...");
    }
  });
