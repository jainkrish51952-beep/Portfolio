import { motion } from 'motion/react';

export default function Skills() {
  const categories = [
    {
      name: "Development",
      skills: [
        { name: "HTML5", level: "95%" },
        { name: "CSS3 / Tailwind", level: "90%" },
        { name: "JavaScript", level: "85%" },
        { name: "React.js", level: "80%" },
      ]
    },
    {
      name: "Design Tools",
      skills: [
        { name: "Photoshop", level: "90%" },
        { name: "Illustrator", level: "85%" },
        { name: "Figma (UI/UX)", level: "90%" },
        { name: "Indesign", level: "75%" },
      ]
    },
    {
      name: "Other Skills",
      skills: [
        { name: "Brand Identity", level: "85%" },
        { name: "Print Design", level: "80%" },
        { name: "Responsive Design", level: "95%" },
        { name: "Problem Solving", level: "90%" },
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-6 bg-[#080808] border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4">Mastery & Tools</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">The Technical <span className="text-gray-700 italic font-serif not-uppercase font-normal">Arsenal</span></h3>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
          {categories.map((cat, catIdx) => (
            <motion.div
              key={catIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.1 }}
              className="space-y-10"
            >
              <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-indigo-500 border-b border-indigo-500/20 pb-4 inline-block">{cat.name}</h4>
              <div className="space-y-8">
                {cat.skills.map((skill, skillIdx) => (
                  <div key={skillIdx} className="space-y-3">
                    <div className="flex justify-between items-end">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{skill.name}</span>
                      <span className="text-indigo-400 text-[9px] font-mono font-bold">{skill.level}</span>
                    </div>
                    <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: skill.level }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, ease: "easeOut", delay: skillIdx * 0.1 }}
                        className="h-full bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Grid Accent */}
        <div className="mt-32 pt-20 border-t border-white/5 flex flex-wrap justify-center gap-10 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
           {['React.js', 'TypeScript', 'Node.js', 'Tailwind', 'Photoshop', 'Illustrator', 'Figma', 'Firebase'].map((tech, i) => (
             <div key={i} className="px-6 py-3 border border-white/10 bg-white/5 text-[10px] uppercase font-black tracking-widest text-gray-400 hover:text-white hover:border-indigo-500/50 transition-colors cursor-crosshair">
               {tech}
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
