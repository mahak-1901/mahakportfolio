import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { resumeLikeOutline, buttonHoverOnAccentFill, buttonHoverOnBright, buttonDarkFill } from '../resumeLikeOutline';
import ResumeModal from './ResumeModal';

const navBtnClass = `${resumeLikeOutline} ${buttonHoverOnAccentFill} bg-[#ff2d2d] text-white font-medium rounded-md transition-all`;

const navLinkClass = `${navBtnClass} text-[15px] tracking-wide text-left px-3 py-2 -mx-1`;

const resumeBtnClass = `${buttonDarkFill} text-white font-medium text-[15px] px-4 py-2 rounded-md tracking-wide`;

const resumeBtnMobileClass = `${buttonDarkFill} text-white font-medium text-sm px-3 py-1.5 rounded-md`;

const menuBtnClass = `${navBtnClass} p-2 active:scale-95`;

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-[#E31E33] shadow-md font-nav">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => scrollToSection('home')}
              className={`text-white text-xs sm:text-sm tracking-[0.14em] uppercase shrink-0 select-none text-left rounded-md px-2 py-2 -ml-2 ${buttonHoverOnBright}`}
            >
              <span className="font-bold">Mahak</span>{' '}
              <span className="font-light">Designs</span>
            </button>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <button type="button" onClick={() => scrollToSection('home')} className={navLinkClass}>
                Home
              </button>
              <button type="button" onClick={() => scrollToSection('about')} className={navLinkClass}>
                About Me
              </button>
              <button type="button" onClick={() => scrollToSection('portfolio')} className={navLinkClass}>
                Portfolio
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className={navLinkClass}>
                Contact
              </button>
              <button type="button" onClick={() => setResumeOpen(true)} className={resumeBtnClass}>
                Resume
              </button>
            </div>

            <div className="flex md:hidden items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => {
                  setResumeOpen(true);
                  setIsMenuOpen(false);
                }}
                className={resumeBtnMobileClass}
              >
                Resume
              </button>
              <button
                type="button"
                className={menuBtnClass}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-3 pt-3 flex flex-col gap-3 border-t border-white/25">
              <button type="button" onClick={() => scrollToSection('home')} className={navLinkClass}>
                Home
              </button>
              <button type="button" onClick={() => scrollToSection('about')} className={navLinkClass}>
                About Me
              </button>
              <button type="button" onClick={() => scrollToSection('portfolio')} className={navLinkClass}>
                Portfolio
              </button>
              <button type="button" onClick={() => scrollToSection('contact')} className={navLinkClass}>
                Contact
              </button>
            </div>
          )}
        </div>
      </nav>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
};

export default Navbar;
