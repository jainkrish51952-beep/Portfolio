import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutDashboard, User as UserIcon, LogOut } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../App';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '/#about' },
    { name: 'Skills', href: '/#skills' },
    { name: 'Projects', href: '/#projects' },
    { name: 'Contact', href: '/#contact' },
  ];

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 py-4 px-6 md:px-12",
        isScrolled ? "bg-[#080808]/90 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 flex items-center justify-center font-bold text-lg rounded-sm transition-transform group-hover:rotate-6">K</div>
          <span className="text-sm font-semibold tracking-widest uppercase">Krish. Portfolio</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          {location.pathname === '/' && navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              className="text-[11px] font-medium text-gray-500 hover:text-white transition-colors uppercase tracking-[0.2em]"
            >
              {link.name}
            </a>
          ))}
          
          {isAdmin && (
            <Link 
              to="/dashboard" 
              className="flex items-center gap-2 text-[11px] font-bold text-indigo-400 hover:text-white transition-colors uppercase tracking-widest"
            >
              <LayoutDashboard size={14} />
              Admin Portal
            </Link>
          )}

          {user ? (
            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
              <span className="text-[10px] text-gray-500 uppercase tracking-tighter hidden lg:inline">{user.email}</span>
              <button 
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-500 transition-colors"
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
             <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal'))}
              className="px-6 py-2 border border-indigo-500/50 text-indigo-400 text-[10px] uppercase font-bold rounded-full hover:bg-indigo-500/10 transition-colors tracking-widest"
            >
              Login
            </button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 p-6 md:hidden flex flex-col gap-6"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-white/70 hover:text-orange-500 transition-colors"
              >
                {link.name}
              </a>
            ))}
            {isAdmin && (
              <Link 
                to="/dashboard" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-orange-500"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <button 
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                className="text-lg font-medium text-red-500 flex items-center gap-2"
              >
                <LogOut size={20} /> Logout
              </button>
            ) : (
              <button 
                onClick={() => { window.dispatchEvent(new CustomEvent('open-auth-modal')); setIsMobileMenuOpen(false); }}
                className="w-full py-4 bg-white text-black font-bold rounded-2xl"
              >
                Login
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
