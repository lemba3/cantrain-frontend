import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface PdfViewerProps {
  pdfUrl: string;
}

const PdfViewer: React.FC<PdfViewerProps> = ({pdfUrl}) => {
  const [loading, setLoading] = useState(true);
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  useEffect(() => {
    // Load PDF.js worker script asynchronously
    const loadPdfWorker = async () => {
      pdfjs.GlobalWorkerOptions.workerSrc = new URL(
        'pdfjs-dist/build/pdf.worker.min.js',
        import.meta.url,
      ).toString();
      setLoading(false); // Set loading to false after workerSrc is defined
    };

    loadPdfWorker();
  }, []);

  return ( 
    <>
      {!loading &&
      <div className="w-full max-w-screen-md h-[80vh] min-w-[50vw] overflow-y-scroll mx-auto bg-gray-300 p-6">
        <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page, index) => {
              return (
                <div key={index} className="mb-6">
                  <p className="pb-4">
                    Page {index+1} of {numPages}
                  </p>
                  <Page
                    pageNumber={page}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </div>
              );
          })}
        </Document>
      </div>}
    </> 
  );
}
 
export default PdfViewer;