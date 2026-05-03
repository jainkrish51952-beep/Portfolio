import { motion } from 'motion/react';
import { GraduationCap, Code2, PenTool, Lightbulb } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: <GraduationCap className="text-orange-500" />,
      title: "BCA Student",
      desc: "Currently pursuing Bachelor of Computer Applications, merging technical knowledge with creative design."
    },
    {
      icon: <Code2 className="text-blue-500" />,
      title: "Web Development",
      desc: "Passionate about building responsive, modern, and high-performance websites using the latest technologies."
    },
    {
      icon: <PenTool className="text-purple-500" />,
      title: "Graphic Design",
      desc: "Creating impactful visual identities, social media creatives, and branding materials."
    },
    {
      icon: <Lightbulb className="text-yellow-500" />,
      title: "UI/UX Vision",
      desc: "Focusing on user-centric designs that provide seamless navigation and delightful experiences."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden bg-[#0a0a0a]/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1000" 
                alt="About Krish" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-orange-600/20 mix-blend-multiply" />
            </div>
            {/* Background Decoration */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-blue-600/10 blur-[100px] rounded-full" />
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-indigo-500 font-bold mb-4">About the Designer</h2>
              <h3 className="text-4xl md:text-5xl font-serif italic mb-8 tracking-tighter text-white">
                Merging <span className="not-italic font-sans font-black uppercase text-3xl md:text-4xl">Logic</span> with <span className="text-indigo-600 font-sans font-black uppercase text-3xl md:text-4xl">Creative Vision</span>
              </h3>
              
              <div className="space-y-6 text-sm text-gray-400 font-normal leading-relaxed mb-12">
                <p>
                  I'm Krish, a dedicated BCA student with a deep passion for digital craftsmanship. 
                  My journey began with a curiosity for code and evolved into a multi-disciplinary approach to design.
                </p>
                <p>
                  I believe that great design is not just about how it looks, but how it works. 
                  By combining my computational foundation with an artistic eye, I strive to create 
                  solutions that are both technically robust and visually arresting.
                </p>
              </div>
            </motion.div>

            <div className="grid sm:grid-cols-2 gap-6">
              {highlights.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="p-6 bg-white/5 border border-white/5 group hover:border-indigo-500/30 transition-colors"
                >
                  <div className="mb-4 inline-block p-2 bg-indigo-600/10 rounded-sm group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h4 className="text-xs font-black uppercase tracking-widest mb-2">{item.title}</h4>
                  <p className="text-[11px] text-gray-500 leading-relaxed uppercase tracking-tighter">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
