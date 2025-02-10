import React from "react";

const PdfToHtml: React.FC<PdfData> = ({ pages }) => {
  return (
    <>
      {pages.map((page, pageIndex) => (
        <div key={pageIndex} className="container">
          {page.Texts.map((textObj, textIndex, arr) => {
            const isBullet = "%E2%80%A2" === textObj.R.map((r) => r.T).join("");

            const nextTextObj = arr[textIndex + 1];
            if (isBullet && nextTextObj) {
              nextTextObj.R[0] = {
                ...nextTextObj.R[0],
                T: `%E2%80%A2${nextTextObj.R[0].T}`,
              };
              return null;
            }
            const decodedText = decodeURIComponent(
              textObj.R.map((r) => r.T).join("")
            );
            const fontSize = textObj.R[0].TS[1]; // Font size
            const isBold = textObj.R[0].TS[2] === 1; // Bold
            const isItalic = textObj.R[0].TS[3] === 1; // Italic
            const align = textObj.A || "left"; // Alignment
            const newBreak =
              textIndex > 0 &&
              (fontSize > arr[textIndex - 1]?.R[0]?.TS[1] ||
                Number(isBold) != arr[textIndex - 1]?.R[0]?.TS[2]);

            const text = `${decodedText}\n`;

            return (
              <React.Fragment key={textIndex}>
                {newBreak && <br />}

                <span
                  key={textIndex}
                  style={{
                    // position: "relative",
                    // top: `${textObj.y}pt`,
                    // left: `${textObj.x}pt`,
                    whiteSpace: "pre-line",
                    fontSize: `${fontSize}px`,
                    fontWeight: isBold ? "bold" : "normal",
                    fontStyle: isItalic ? "italic" : "normal",
                    textAlign: align as React.CSSProperties["textAlign"],
                  }}
                >
                  {text}
                </span>
              </React.Fragment>
            );
          })}
        </div>
      ))}
    </>
  );
};

export default PdfToHtml;
