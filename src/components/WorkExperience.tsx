const WorkExperience = () => {
  const experiences = [
    {
      role: 'Freelance work at',
      company: 'LeXi Ai',
      companyInline: true,
      description:
        'Assisted in organizing and managing a fashion show event, coordinating with team members and ensuring smooth execution.'
    },
    {
      role: 'Content development and Content Editing Intern',
      company: 'Aptimania',
      description: 'Worked on content development and editing projects, contributing to the creation of engaging and informative content.'
    },
    {
      role: 'Volunteer in Fashion Show',
      company: 'Jaipur Couture Show',
      description: 'Assisted in organizing and managing event, coordinating with team members and ensuring smooth execution.'
    }
  ];

  return (
    <section id="experience" className="bg-gradient-to-b from-black to-gray-900 py-20">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center">
          Work Experience
        </h2>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 pb-8 border-l-2 border-gray-700 last:border-l-0 last:pb-0 hover:border-[#ff2d2d] transition-colors group"
            >
              <div className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 bg-[#ff2d2d] rounded-full ring-4 ring-black group-hover:ring-[#ff2d2d]/20 transition-all"></div>

              <div className="bg-gray-800/50 rounded-xl p-6 hover:bg-gray-800 transition-all hover:shadow-xl hover:shadow-red-500/10">
                <div className="mb-3">
                  <h3 className={`text-xl font-bold text-white${exp.companyInline ? ' mb-3' : ''}`}>
                    {exp.companyInline ? (
                      <>
                        {exp.role}{' '}
                        <span className="text-[#ff2d2d]">{exp.company}</span>
                      </>
                    ) : (
                      exp.role
                    )}
                  </h3>
                </div>
                {!exp.companyInline && (
                  <p className="text-[#ff2d2d] font-semibold mb-3">{exp.company}</p>
                )}
                <p className="text-gray-300 leading-relaxed">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkExperience;
