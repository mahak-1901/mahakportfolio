import { useEffect, useState } from 'react';
import { Figma, Palette, CreditCard, Camera } from 'lucide-react';

const TOOL_WORDS = ['FIGMA', 'CANVA'];

const useTypewriter = (words: string[]) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let delay = isDeleting ? 120 : 200;

    if (!isDeleting && text === currentWord) {
      delay = 2200;
    } else if (isDeleting && text === '') {
      delay = 600;
    }

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentWord) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && text === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
        return;
      }

      setText((prev) =>
        isDeleting ? prev.slice(0, -1) : currentWord.slice(0, prev.length + 1)
      );
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words]);

  return text;
};

const ToolsCapabilities = () => {
  const typedTool = useTypewriter(TOOL_WORDS);

  const capabilities = [
    { icon: Figma, title: 'UI UX Design', description: 'Creating intuitive user experiences' },
    { icon: Palette, title: 'Poster Design', description: 'Eye-catching visual designs' },
    { icon: CreditCard, title: 'Card Design', description: 'Modern card layouts' },
    { icon: Camera, title: 'Photography', description: 'Capturing moments creatively' }
  ];

  return (
    <section className="bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm uppercase tracking-wider mb-4">Tools I play with</p>
          <h2 className="text-6xl md:text-8xl font-bold text-white mb-8 min-h-[1.15em] tracking-[0.18em] md:tracking-[0.22em]">
            {typedTool}
            <span className="typewriter-cursor" aria-hidden="true" />
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-[#ff2d2d]">Capabilities</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {capabilities.map((item, index) => (
            <div
              key={index}
              className="bg-gray-800/50 rounded-xl p-8 text-center hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-red-500/20 transform hover:-translate-y-2 group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#ff2d2d]/10 rounded-full mb-4 group-hover:bg-[#ff2d2d]/20 transition-colors">
                <item.icon className="text-[#ff2d2d]" size={32} />
              </div>
              <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsCapabilities;
