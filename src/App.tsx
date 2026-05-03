/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { onAuthStateChanged, User } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp, collection, addDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { UserProfile } from './types';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AuthModal from './components/AuthModal';

// Context
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => useContext(AuthContext);

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      if (user) {
        // Sync profile
        const userRef = doc(db, 'users', user.uid);
        const userDoc = await getDoc(userRef);
        
        if (!userDoc.exists()) {
          const newProfile: UserProfile = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            role: user.email === 'Jainkrish51952@gmail.com' ? 'admin' : 'user',
            createdAt: serverTimestamp(),
          };
          await setDoc(userRef, newProfile);
          // Add notification for admin
          await addDoc(collection(db, 'notifications'), {
            type: 'registration',
            message: `New user registration: ${user.email}`,
            userEmail: user.email,
            createdAt: serverTimestamp(),
            read: false
          });
          setProfile(newProfile);
        } else {
          setProfile(userDoc.data() as UserProfile);
        }
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const isAdmin = profile?.role === 'admin' || user?.email === 'Jainkrish51952@gmail.com';

  return (
    <AuthContext.Provider value={{ user, profile, loading, isAdmin }}>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-[#080808] text-gray-200 selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden font-sans">
          {/* Subtle Grid Pattern Overlay */}
          <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" 
            style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} 
          />

          <Navbar />
          
          <main className="relative z-10">
            <Routes>
              <Route path="/" element={
                <AnimatePresence mode="wait">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <Hero />
                    <About />
                    <Skills />
                    <Projects />
                    <Contact />
                  </motion.div>
                </AnimatePresence>
              } />
              
              <Route path="/dashboard" element={
                loading ? (
                  <div className="h-screen flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                ) : isAdmin ? (
                  <AdminDashboard />
                ) : (
                  <Navigate to="/" />
                )
              } />
            </Routes>
          </main>

          <Footer />
          <AuthModal />
        </div>
      </Router>
    </AuthContext.Provider>
  );
}
