import pdfToHtml from "./pdfToHtml";

const ResumeHTML = (data: PDFLine[]) => {
  try {
    return <div>{pdfToHtml({ lines: data })}</div>;
  } catch (err) {
    console.log(err);
    return (
      <div id="failed">
        <p>Error constructing HTML from PDF</p>
      </div>
    );
  }
};

export default ResumeHTML;
