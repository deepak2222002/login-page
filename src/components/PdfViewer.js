import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

export default function PdfViewer({ url }) {
  const canvasRef = useRef(null);
  const [pdf, setPdf] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    pdfjsLib.getDocument({ url, disableWorker: true }).promise
      .then(setPdf);
  }, [url]);

  useEffect(() => {
    if (!pdf) return;

    pdf.getPage(page).then((p) => {
      const viewport = p.getViewport({ scale: 1.3 });
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      p.render({ canvasContext: ctx, viewport });
    });
  }, [pdf, page]);

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} />

      <div style={{ marginTop: 10 }}>
        <button
          disabled={page <= 1}
          onClick={() => setPage((p) => p - 1)}
        >
          ◀ Previous
        </button>

        <span style={{ margin: "0 15px" }}>
          Page {page} / {pdf?.numPages}
        </span>

        <button
          disabled={page >= pdf?.numPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next ▶
        </button>
      </div>
    </div>
  );
}
