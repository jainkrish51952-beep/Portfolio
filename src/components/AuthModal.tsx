import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, LogIn } from 'lucide-react';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function AuthModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-auth-modal', handleOpen);
    return () => window.removeEventListener('open-auth-modal', handleOpen);
  }, []);

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      setIsOpen(false);
    } catch (err) {
      console.error(err);
      setError('Failed to login with Google. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-full max-w-md bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative z-10 shadow-2xl"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full transition-colors"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-orange-600 rounded-2xl flex items-center justify-center font-bold text-3xl mx-auto mb-6 shadow-xl shadow-orange-600/30">K</div>
              <h2 className="text-3xl font-bold tracking-tighter mb-2">Welcome Back</h2>
              <p className="text-white/40">Sign in to your account to interact</p>
            </div>

            <div className="space-y-4">
              <button 
                onClick={handleGoogleLogin}
                className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-4 hover:bg-orange-500 hover:text-white transition-all shadow-lg"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </button>
            </div>

            {error && <p className="mt-4 text-red-500 text-sm text-center font-medium">{error}</p>}

            <p className="mt-10 text-center text-xs text-white/20 leading-relaxed uppercase tracking-widest">
              By continuing, you agree to our <br /> Terms of Service & Privacy Policy
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
