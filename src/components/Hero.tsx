import { motion } from 'motion/react';
import { ArrowRight, Download, ExternalLink, Globe, Palette } from 'lucide-react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-orange-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-500 text-xs font-bold uppercase tracking-widest mb-6 border-l-2 border-indigo-500 pl-4"
          >
            BCA Student & Digital Artist
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-serif italic leading-[1.1] mb-8 text-gray-400 group">
            Hi, I'm <span className="text-white not-italic font-sans font-black block text-7xl md:text-9xl uppercase tracking-tighter mt-2">Krish</span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 max-w-sm mb-10 leading-relaxed font-normal">
            Crafting pixel-perfect web experiences and visually stunning graphic narratives. 
            Bridging the gap between code and creative design.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-md">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-10 py-5 bg-white text-black font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl shadow-white/5"
            >
              Hire Me Now
            </motion.button>
            <div className="flex gap-4 flex-1">
              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.upwork.com/freelancers/~01e3486f80c066a90e?mp_source=share"
                target="_blank"
                className="flex-1 py-4 bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                Upwork
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="https://www.behance.net/krishjain01"
                target="_blank"
                className="flex-1 py-4 bg-white/5 border border-white/10 text-[10px] uppercase font-bold tracking-widest flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                Behance
              </motion.a>
            </div>
          </div>

          <div className="mt-16 p-6 bg-white/5 border border-white/10 flex items-center gap-4 max-w-sm">
             <div className="relative flex h-3 w-3">
               <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
               <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
             </div>
             <div>
               <p className="text-[10px] uppercase text-gray-500 font-bold tracking-widest leading-none mb-1">Admin Presence</p>
               <p className="text-[11px] text-gray-400 italic">jainkrish51952@gmail.com</p>
             </div>
             <button 
               onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
               className="ml-auto text-indigo-400 text-[10px] uppercase font-black tracking-widest border-b border-indigo-400/30 hover:border-indigo-400 pb-0.5"
             >
               Login
             </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative hidden lg:block"
        >
          <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 group">
             {/* Replace with actual image later or generated placeholder */}
             <div className="absolute inset-0 bg-gradient-to-br from-orange-600/20 to-[#050505] mix-blend-overlay z-10" />
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1000')] bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-700" />
             
             {/* Floating UI Badges */}
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
               className="absolute top-10 right-[-20px] bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl z-20 shadow-2xl"
             >
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center"><ExternalLink size={20} /></div>
                 <div>
                   <p className="text-[10px] uppercase tracking-wider opacity-50">Latest Project</p>
                   <p className="font-bold text-sm">Portfolio v2.0</p>
                 </div>
               </div>
             </motion.div>

             <motion.div 
               animate={{ y: [0, 10, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               className="absolute bottom-10 left-[-40px] bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-[2rem] z-20 shadow-2xl"
             >
               <p className="text-4xl font-bold italic tracking-tighter">BCA</p>
               <p className="text-xs uppercase tracking-[0.3em] opacity-50">Student</p>
             </motion.div>
          </div>
          
          {/* Decorative Ring */}
          <div className="absolute -inset-4 border border-white/5 rounded-[2.5rem] -z-10 animate-[spin_20s_linear_infinite]" />
        </motion.div>
      </div>
    </section>
  );
}
