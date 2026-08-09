import { useEffect, useRef, useState } from 'react';
import { Download, X } from 'lucide-react';
import { Document, Page, pdfjs } from 'react-pdf';
import { buttonDarkFill, buttonHoverOnGray } from '../resumeLikeOutline';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const RESUME_URL = '/resume.pdf';
const DOWNLOAD_NAME = 'Mahak-Khandelwal-Resume.pdf';

type ResumeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ResumeModal = ({ isOpen, onClose }: ResumeModalProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [pageWidth, setPageWidth] = useState(720);

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

  if (!isOpen) return null;

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_URL;
    link.download = DOWNLOAD_NAME;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4"
      onClick={onClose}
      role="presentation"
    >
      <button
        type="button"
        onClick={onClose}
        className={`absolute top-6 right-6 z-10 rounded-full bg-gray-800 p-3 ${buttonHoverOnGray}`}
        aria-label="Close"
      >
        <X className="text-white" size={24} />
      </button>

      <div
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-xl bg-gray-900 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-modal-title"
      >
        <div className="flex items-center justify-between gap-4 border-b border-gray-700 p-4 sm:p-6">
          <h3 id="resume-modal-title" className="text-xl font-bold text-white sm:text-2xl">
            Resume
          </h3>
          <button
            type="button"
            onClick={handleDownload}
            className={`flex shrink-0 items-center gap-2 rounded-md py-2 px-4 font-semibold text-white ${buttonDarkFill}`}
          >
            <Download size={20} />
            <span>Download</span>
          </button>
        </div>

        <div ref={contentRef} className="flex-1 overflow-auto p-4 sm:p-6">
          <Document
            file={RESUME_URL}
            onLoadSuccess={({ numPages: totalPages }) => setNumPages(totalPages)}
            loading={
              <div className="flex min-h-[50vh] items-center justify-center text-gray-400">
                Loading resume…
              </div>
            }
            error={
              <div className="flex min-h-[50vh] items-center justify-center text-red-400">
                Unable to load resume.
              </div>
            }
            className="flex flex-col items-center gap-4"
          >
            {Array.from({ length: numPages }, (_, index) => (
              <div
                key={`resume-page-${index + 1}`}
                className="inline-block max-w-full overflow-hidden rounded-lg bg-white"
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

export default ResumeModal;
