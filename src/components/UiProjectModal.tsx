import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { buttonHoverOnGray } from '../resumeLikeOutline';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

export type UiProjectModalProps = {
  isOpen: boolean;
  title: string;
  pdfUrl: string;
  onClose: () => void;
};

const UiProjectModal = ({ isOpen, title, pdfUrl, onClose }: UiProjectModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(880);

  useEffect(() => {
    if (!isOpen) {
      setNumPages(0);
      return;
    }

    const update = () => {
      const width = contentRef.current?.clientWidth;
      if (width) setPageWidth(width);
    };

    update();
    window.addEventListener('resize', update);

    let observer: ResizeObserver | undefined;
    const frame = window.requestAnimationFrame(() => {
      if (!contentRef.current) return;
      observer = new ResizeObserver(update);
      observer.observe(contentRef.current);
      update();
    });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener('resize', update);
      observer?.disconnect();
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const titleId = `${title.toLowerCase().replace(/\s+/g, '-')}-project-title`;

  return (
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-black"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <div className="sticky top-0 z-10 flex shrink-0 items-center justify-between border-b border-gray-800 bg-black/95 px-4 py-3 backdrop-blur-sm sm:px-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#ff2d2d]">UI UX Project</p>
          <h2 id={titleId} className="text-lg font-bold text-white sm:text-xl">
            {title}
          </h2>
        </div>
        <button
          type="button"
          onClick={onClose}
          className={`rounded-full bg-gray-800 p-3 ${buttonHoverOnGray}`}
          aria-label="Close project"
        >
          <X className="text-white" size={22} />
        </button>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-smooth">
        <div
          ref={contentRef}
          className="mx-auto w-full max-w-6xl px-3 py-8 sm:px-6 sm:py-10"
        >
          <Document
            file={pdfUrl}
            onLoadSuccess={({ numPages: totalPages }) => setNumPages(totalPages)}
            loading={
              <div className="flex min-h-[50vh] items-center justify-center text-gray-400">
                Loading project…
              </div>
            }
            error={
              <div className="flex min-h-[50vh] items-center justify-center text-red-400">
                Unable to load the {title} project PDF.
              </div>
            }
            className="flex flex-col items-center gap-6"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={`${pdfUrl}-page-${index + 1}`}
                className="inline-block max-w-full overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-gray-800"
              >
                <Page
                  pageNumber={index + 1}
                  width={pageWidth}
                  devicePixelRatio={Math.min(window.devicePixelRatio || 1, 2)}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  className="pdf-page block"
                />
              </div>
            ))}
          </Document>
        </div>
      </div>
    </div>
  );
};

export default UiProjectModal;
