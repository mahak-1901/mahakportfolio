import aboutIllustration from '../assets/about-illustration.png';
import { resumeLikeOutline, buttonHoverOnAccentFill } from '../resumeLikeOutline';

const AboutMe = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="about" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          About Me
        </h2>

        <div className="rounded-3xl border border-gray-800 bg-black p-8 md:p-10 lg:p-12 md:grid md:grid-cols-2 md:items-center md:gap-12">
          <div className="space-y-6 mb-10 md:mb-0">
            <p className="text-gray-300 text-lg leading-relaxed">
              Innovative and passionate design student known for a strong sense of curiosity, collaborative spirit, and a drive to push creative boundaries. Seeking opportunities to contribute fresh perspectives, solve meaningful design challenges, and grow within dynamic creative environments.
            </p>
            <button
              type="button"
              onClick={() => scrollToSection('portfolio')}
              className={`${resumeLikeOutline} ${buttonHoverOnAccentFill} bg-[#ff2d2d] text-white px-8 py-3 rounded-md font-semibold`}
            >
              Browse Projects
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-md overflow-hidden rounded-2xl bg-black">
              <img
                src={aboutIllustration}
                alt="Designer at work — illustration"
                className="block h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
