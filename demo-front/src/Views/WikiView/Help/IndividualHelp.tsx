import React from "react";
import PDFView from "Views/PdfView";

export const IndividualHelp: React.FC<{}> = () => {
  return <PDFView pdfPath="/files/individualWiki.pdf" />;
};
