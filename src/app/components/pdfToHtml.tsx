import React from "react";

const PdfToHtml: React.FC<PDFData> = ({ lines }) => {
	return (
		<div className="container p-1">
			<h3>HTML generated from PDF</h3>
			{lines.map((line, lineIndex) => {
				return (
					<div key={lineIndex}>
						{line.texts.map((segment, segmentIndex) => {
							return (
								<span
									key={segmentIndex}
									style={{
										position: "relative",
										top: `${line.y}pt`,
										whiteSpace: "pre-line",
										fontSize: `${segment.formatting.fontSize}px`,
										fontWeight: segment.formatting.isBold ? "bold" : "normal",
										fontStyle: segment.formatting.isItalic
											? "italic"
											: "normal",
										textAlign: segment.formatting
											.align as React.CSSProperties["textAlign"],
									}}
								>
									{segment.text}
								</span>
							);
						})}
					</div>
				);
			})}
		</div>
	);
};

export default PdfToHtml;
