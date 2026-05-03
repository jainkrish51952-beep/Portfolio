import { motion } from 'motion/react';
import { Heart, Instagram, Linkedin, Twitter, MessageSquare } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-20 px-6 border-t border-white/5 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-bold text-lg rounded-sm">K</div>
              <span className="text-sm font-semibold tracking-widest uppercase">Krish. Portfolio</span>
            </div>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed text-xs uppercase tracking-tighter">
              Design-driven developer and creative enthusiast. Helping brands stand out in the digital landscape with modern, elegant solutions.
            </p>
            <div className="flex gap-4">
              {[Instagram, Linkedin, Twitter, MessageSquare].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-10 h-10 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white mb-8 border-b border-white/5 pb-2 inline-block">Directory</h4>
            <ul className="space-y-4">
              <li><a href="#about" className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-indigo-400 transition-colors">About</a></li>
              <li><a href="#projects" className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-indigo-400 transition-colors">Works</a></li>
              <li><a href="#skills" className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-indigo-400 transition-colors">Expertise</a></li>
              <li><a href="#contact" className="text-[10px] uppercase font-bold tracking-widest text-gray-500 hover:text-indigo-400 transition-colors">Connect</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-black text-white mb-8 border-b border-white/5 pb-2 inline-block">Contact</h4>
            <ul className="space-y-4 text-[10px] uppercase font-bold tracking-widest leading-relaxed">
              <li className="text-gray-500">EMAIL <br /><span className="text-white">Jainkrish51952@gmail.com</span></li>
              <li className="text-gray-500">PHONE <br /><span className="text-white">+91 93066 60977</span></li>
              <li className="text-gray-500">LOCATION <br /><span className="text-white">INDIA / REMOTE</span></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] text-gray-600 uppercase tracking-widest font-black">
            © {currentYear} KRISH DESIGN. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[9px] text-gray-700 uppercase tracking-widest flex items-center gap-2">
            CRAFTED WITH PRECISION <Heart size={10} className="text-indigo-600 fill-current" />
          </p>
        </div>
      </div>
    </footer>
  );
}
