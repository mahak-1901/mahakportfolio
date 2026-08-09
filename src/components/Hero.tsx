import heroPortrait from '../assets/hero-portrait.png';
import { resumeLikeOutline, buttonHoverOnAccentFill } from '../resumeLikeOutline';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center pt-20">
      <div className="max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in">
            <p className="text-gray-400 text-lg">Hi, I am</p>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Mahak<br />Khandelwal
            </h1>
            <button
              type="button"
              className={`${resumeLikeOutline} ${buttonHoverOnAccentFill} bg-[#ff2d2d] text-white px-8 py-3 rounded-md font-semibold`}
            >
              UI UX Designer
            </button>
          </div>

          <div className="flex justify-center items-end animate-fade-in-delay">
            <img
              src={heroPortrait}
              alt="Mahak Khandelwal"
              className="w-full max-w-md max-h-[min(85vh,540px)] object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
