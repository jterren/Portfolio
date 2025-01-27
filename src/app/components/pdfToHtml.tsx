import React from "react";

const PdfToHtml: React.FC<PdfData> = ({ pages }) => {
  return (
    <>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="container">
          {page.Texts.map((textObj, textIndex) => {
            const decodedText = decodeURIComponent(
              textObj.R.map((r) => r.T).join("")
            );
            const fontSize = textObj.R[0].TS[1]; // Font size
            const isBold = textObj.R[0].TS[2] === 1; // Bold
            const isItalic = textObj.R[0].TS[3] === 1; // Italic
            const align = textObj.A || "left"; // Alignment

            return (
              <>
                <br />
                <br />
                <span
                  key={textIndex}
                  style={{
                    position: "relative",
                    top: `${textObj.y}pt`,
                    left: `${textObj.x}pt`,
                    fontSize: `${fontSize}px`,
                    fontWeight: isBold ? "bold" : "normal",
                    fontStyle: isItalic ? "italic" : "normal",
                    textAlign: align as React.CSSProperties["textAlign"],
                  }}
                >
                  {decodedText}
                </span>
              </>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default PdfToHtml;
