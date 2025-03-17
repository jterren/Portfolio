interface LinkElement {
  text: string;
  route: string;
}

interface TextRun {
  T: string;
  S: number;
  TS: number[];
}

interface PdfText {
  x: number;
  y: number;
  w?: number;
  clr?: number;
  sw?: number;
  A?: string;
  R: TextRun[];
}

interface PdfPage {
  Width: number;
  Height: number;
  HLines: unknown[];
  VLines: unknown[];
  Fills: unknown[];
  Texts: PdfText[];
  Fields: unknown[];
  Boxsets: unknown[];
}

interface PDFText {
  text: string;
  x: number;
  formatting: {
    fontSize: number;
    isBold: boolean;
    isItalic: boolean;
    align: string;
  };
}

interface PDFLine {
  y: number;
  texts: PDFText[];
}

interface PDFData {
  lines: PDFLine[];
}

interface quote {
  author: string;
  text: string;
}
