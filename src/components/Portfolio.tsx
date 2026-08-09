import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useRef, useState } from 'react';
import { buttonHoverOnGray } from '../resumeLikeOutline';
import UiProjectModal from './UiProjectModal';
import ecotankThumb from '../assets/Screenshot_2026-03-25_013306.png';
import jaipurbuzzThumb from '../assets/Screenshot_2026-03-25_012829.png';
import kakshaThumb from '../assets/kaksha-thumb.png';

const posterGlob = import.meta.glob<{ default: string }>('../assets/posters/poster-*.png', { eager: true });
const posters = Object.keys(posterGlob)
  .sort()
  .map((key) => posterGlob[key].default);

const Portfolio = () => {
  const posterScrollRef = useRef<HTMLDivElement>(null);
  const photoScrollRef = useRef<HTMLDivElement>(null);
  const [selectedPoster, setSelectedPoster] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [openProject, setOpenProject] = useState<{ title: string; pdfUrl: string } | null>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = 300;
      ref.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const uiProjects = [
    {
      title: 'Jaipurbuzz',
      image: jaipurbuzzThumb,
      pdfUrl: '/jaipurbuzz.pdf',
    },
    {
      title: 'EcoTank',
      image: ecotankThumb,
      pdfUrl: '/ecotank.pdf',
    },
    {
      title: 'Kaksha',
      image: kakshaThumb,
      pdfUrl: '/kaksha.pdf',
    },
  ];

  const photos = [
    '/src/assets/Screenshot_2026-03-26_015108.png',
    '/src/assets/Screenshot_2026-03-26_015138.png',
    '/src/assets/Screenshot_2026-03-26_015226.png',
    '/src/assets/Screenshot_2026-03-26_015319.png',
    '/src/assets/Screenshot_2026-03-26_015432.png',
    '/src/assets/Screenshot_2026-03-26_015453.png',
    '/src/assets/Screenshot_2026-03-26_015531.png',
    '/src/assets/Screenshot_2026-03-26_015603.png',
    '/src/assets/Screenshot_2026-03-26_015719.png',
    '/src/assets/Screenshot_2026-03-26_015746.png',
    '/src/assets/Screenshot_2026-03-26_015820.png',
    '/src/assets/Screenshot_2026-03-26_015854.png'
  ];

  const handlePrevPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === 0 ? photos.length - 1 : selectedPhoto - 1);
    }
  };

  const handleNextPhoto = () => {
    if (selectedPhoto !== null) {
      setSelectedPhoto(selectedPhoto === photos.length - 1 ? 0 : selectedPhoto + 1);
    }
  };

  const handlePrevPoster = () => {
    if (selectedPoster !== null) {
      setSelectedPoster(selectedPoster === 0 ? posters.length - 1 : selectedPoster - 1);
    }
  };

  const handleNextPoster = () => {
    if (selectedPoster !== null) {
      setSelectedPoster(selectedPoster === posters.length - 1 ? 0 : selectedPoster + 1);
    }
  };

  return (
    <section id="portfolio" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Portfolio
        </h2>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8">Featured UI UX Projects</h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {uiProjects.map((project) => (
              <div
                key={project.title}
                role="button"
                tabIndex={0}
                onClick={() => setOpenProject({ title: project.title, pdfUrl: project.pdfUrl })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setOpenProject({ title: project.title, pdfUrl: project.pdfUrl });
                  }
                }}
                className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-800 ring-1 ring-gray-700/50 transition-all transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20"
              >
                <div className="aspect-[16/10] overflow-hidden bg-gray-900/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
                  View project
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-20">
          <h3 className="text-2xl font-bold text-white mb-8">Featured Poster Designs</h3>
          <div className="relative flex items-center justify-between">
            <button
              onClick={() => scroll(posterScrollRef, 'left')}
              className={`absolute left-0 -ml-12 z-10 bg-gray-800 p-4 rounded-full ${buttonHoverOnGray}`}
            >
              <ChevronLeft className="text-white" size={24} />
            </button>

            <div
              ref={posterScrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4 flex-1 sm:gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {posters.map((poster, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPoster(index)}
                  className="flex h-[22rem] shrink-0 cursor-pointer items-center sm:h-96 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <img
                    src={poster}
                    alt={`Poster ${index + 1}`}
                    className="h-full w-auto max-h-full object-contain max-w-[min(92vw,30rem)]"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll(posterScrollRef, 'right')}
              className={`absolute right-0 -mr-12 z-10 bg-gray-800 p-4 rounded-full ${buttonHoverOnGray}`}
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </div>

          {selectedPoster !== null && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedPoster(null)}
                className={`absolute top-6 right-6 bg-gray-800 p-3 rounded-full ${buttonHoverOnGray} z-10`}
              >
                <X className="text-white" size={24} />
              </button>

              <button
                onClick={handlePrevPoster}
                className={`absolute left-6 bg-gray-800 p-3 rounded-full ${buttonHoverOnGray} z-10`}
              >
                <ChevronLeft className="text-white" size={24} />
              </button>

              <div className="max-w-5xl max-h-[85vh] flex items-center justify-center">
                <img
                  src={posters[selectedPoster]}
                  alt={`Poster ${selectedPoster + 1}`}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              </div>

              <button
                onClick={handleNextPoster}
                className={`absolute right-6 bg-gray-800 p-3 rounded-full ${buttonHoverOnGray} z-10`}
              >
                <ChevronRight className="text-white" size={24} />
              </button>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/80 px-4 py-2 rounded-full">
                <p className="text-white text-sm">
                  {selectedPoster + 1} / {posters.length}
                </p>
              </div>
            </div>
          )}
        </div>

        <div>
          <h3 className="text-2xl font-bold text-white mb-8">Featured Photography</h3>
          <div className="relative flex items-center justify-between">
            <button
              onClick={() => scroll(photoScrollRef, 'left')}
              className={`absolute left-0 -ml-12 z-10 bg-gray-800 p-4 rounded-full ${buttonHoverOnGray}`}
            >
              <ChevronLeft className="text-white" size={24} />
            </button>

            <div
              ref={photoScrollRef}
              className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth pb-4 flex-1 sm:gap-4"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {photos.map((photo, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedPhoto(index)}
                  className="flex h-[22rem] shrink-0 cursor-pointer items-center sm:h-96 transition-transform duration-300 hover:scale-[1.03]"
                >
                  <img
                    src={photo}
                    alt={`Photo ${index + 1}`}
                    className="h-full w-auto max-h-full object-contain max-w-[min(92vw,30rem)]"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll(photoScrollRef, 'right')}
              className={`absolute right-0 -mr-12 z-10 bg-gray-800 p-4 rounded-full ${buttonHoverOnGray}`}
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </div>

          {selectedPhoto !== null && (
            <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
              <button
                onClick={() => setSelectedPhoto(null)}
                className={`absolute top-6 right-6 bg-gray-800 p-3 rounded-full ${buttonHoverOnGray} z-10`}
              >
                <X className="text-white" size={24} />
              </button>

              <button
                onClick={handlePrevPhoto}
                className={`absolute left-6 bg-gray-800 p-3 rounded-full ${buttonHoverOnGray} z-10`}
              >
                <ChevronLeft className="text-white" size={24} />
              </button>

              <div className="max-w-5xl max-h-[85vh] flex items-center justify-center">
                <img
                  src={photos[selectedPhoto]}
                  alt={`Photo ${selectedPhoto + 1}`}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              </div>

              <button
                onClick={handleNextPhoto}
                className={`absolute right-6 bg-gray-800 p-3 rounded-full ${buttonHoverOnGray} z-10`}
              >
                <ChevronRight className="text-white" size={24} />
              </button>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800/80 px-4 py-2 rounded-full">
                <p className="text-white text-sm">
                  {selectedPhoto + 1} / {photos.length}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <UiProjectModal
        isOpen={openProject !== null}
        title={openProject?.title ?? ''}
        pdfUrl={openProject?.pdfUrl ?? ''}
        onClose={() => setOpenProject(null)}
      />
    </section>
  );
};

export default Portfolio;
