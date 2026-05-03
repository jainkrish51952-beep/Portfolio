import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Layout, Palette, Search } from 'lucide-react';
import { collection, onSnapshot, query, orderBy, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project, ProjectCategory } from '../types';
import { cn } from '../lib/utils';
import { handleFirestoreError, OperationType } from '../lib/error-handler';
import { useAuth } from '../App';

export default function Projects() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<ProjectCategory | 'All'>('All');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = 'projects';
    const q = query(collection(db, path), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projectsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Project[];
      setProjects(projectsData);
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.GET, path));

    return () => unsubscribe();
  }, []);

  const handleInteraction = async (project: Project) => {
    if (!user) {
      window.dispatchEvent(new CustomEvent('open-auth-modal'));
      return;
    }
    const path = 'notifications';
    try {
      await addDoc(collection(db, path), {
        type: 'interaction',
        message: `${user.displayName || user.email} interacted with project: ${project.title}`,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        read: false
      });
      alert('Interest sent to Krish!');
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  const filteredProjects = activeTab === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeTab);

  const categories: (ProjectCategory | 'All')[] = ['All', 'Web Design', 'Graphic Design'];

  return (
    <section id="projects" className="py-24 px-6 bg-[#080808]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-white/5 pb-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 font-bold mb-4">Portfolio Showcase</h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-white">Creative <span className="text-indigo-600">Output</span></h3>
          </motion.div>

          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "relative py-2 transition-all duration-300",
                  activeTab === cat 
                    ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-indigo-500" 
                    : "hover:text-gray-300"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-[4/3] bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : filteredProjects.length > 0 ? (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-white/5"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="group relative aspect-[4/3] bg-[#0c0c0c] border border-white/5 overflow-hidden"
                >
                  <div className="absolute inset-0 overflow-hidden">
                    <img 
                      src={project.imageUrl} 
                      alt={project.title} 
                      className="w-full h-full object-cover opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-1000 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                  </div>

                  <div className="p-8 absolute inset-0 flex flex-col justify-end">
                    <div className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                       {project.category}
                    </div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter text-white mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{project.title}</h4>
                    
                    <div className="flex gap-6 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-150 transform translate-y-4 group-hover:translate-y-0">
                      {project.liveUrl && (
                        <a 
                          href={project.liveUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-[10px] font-black uppercase tracking-[0.2em] text-white border-b border-white hover:text-indigo-400 hover:border-indigo-400 pb-1 transition-all"
                        >
                          Live Preview
                        </a>
                      )}
                      <button 
                        onClick={() => handleInteraction(project)}
                        className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 hover:text-white transition-colors"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-white/40 italic">No projects found in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}
