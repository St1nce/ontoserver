import { useState } from "react";
import { Document, Page } from "react-pdf";
import "./PdfView.css";

import { pdfjs } from "react-pdf";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const PDFView: React.FC<{ pdfPath: string }> = ({ pdfPath }) => {
  const [numPages, setNumPages] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
      <div className="pdf-page-changer">
        <button
          disabled={pageNumber === 1}
          onClick={() => {
            setPageNumber((prev) => prev - 1);
          }}
        >
          {"<"}
        </button>
        <span>
          Страница {pageNumber} из {numPages}
        </span>
        <button
          disabled={pageNumber === numPages}
          onClick={() => {
            setPageNumber((prev) => prev + 1);
          }}
        >
          {">"}
        </button>
      </div>
      <Document file={pdfPath} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          width={1000}
          pageNumber={pageNumber}
          renderAnnotationLayer={false}
          renderTextLayer={false}
        />
      </Document>
    </div>
  );
};

export default PDFView;
