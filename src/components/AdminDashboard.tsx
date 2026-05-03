import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Plus, LayoutGrid, MessageSquare, Bell, Settings, 
  Trash2, Edit3, ExternalLink, ArrowLeft, Save, 
  Image as ImageIcon, Link as LinkIcon
} from 'lucide-react';
import { collection, onSnapshot, query, orderBy, addDoc, deleteDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Project, ProjectCategory, ContactMessage, Notification } from '../types';
import { cn } from '../lib/utils';
import { useNavigate } from 'react-router-dom';
import { handleFirestoreError, OperationType } from '../lib/error-handler';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'messages' | 'notifications'>('projects');
  
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  useEffect(() => {
    const unsubProjects = onSnapshot(query(collection(db, 'projects'), orderBy('createdAt', 'desc')), (snap) => {
      setProjects(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Project[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'projects'));
    
    const unsubMessages = onSnapshot(query(collection(db, 'messages'), orderBy('createdAt', 'desc')), (snap) => {
      setMessages(snap.docs.map(d => ({ id: d.id, ...d.data() })) as ContactMessage[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'messages'));
    
    const unsubNotifications = onSnapshot(query(collection(db, 'notifications'), orderBy('createdAt', 'desc')), (snap) => {
      setNotifications(snap.docs.map(d => ({ id: d.id, ...d.data() })) as Notification[]);
    }, (err) => handleFirestoreError(err, OperationType.GET, 'notifications'));

    return () => {
      unsubProjects();
      unsubMessages();
      unsubNotifications();
    };
  }, []);

  const handleDeleteProject = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const path = `projects/${id}`;
      try {
        await deleteDoc(doc(db, 'projects', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, path);
      }
    }
  };

  const menuItems = [
    { id: 'projects', label: 'Projects', icon: <LayoutGrid size={20} /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare size={20} />, count: messages.length },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={20} />, count: notifications.filter(n => !n.read).length },
  ];

  return (
    <div className="pt-24 pb-20 px-6 min-h-screen bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 space-y-2">
             <button 
               onClick={() => navigate('/')}
               className="w-full p-4 flex items-center gap-4 text-white/50 hover:text-white bg-white/5 border border-white/10 rounded-2xl mb-8 transition-all"
             >
               <ArrowLeft size={20} /> Back to Portfolio
             </button>

             {menuItems.map((item) => (
               <button
                 key={item.id}
                 onClick={() => setActiveTab(item.id as any)}
                 className={cn(
                   "w-full p-4 flex items-center justify-between rounded-2xl transition-all border",
                   activeTab === item.id 
                    ? "bg-orange-600 border-orange-500 text-white shadow-xl shadow-orange-600/20" 
                    : "bg-white/5 border-white/10 text-white/50 hover:bg-white/10"
                 )}
               >
                 <div className="flex items-center gap-4">
                   {item.icon}
                   <span className="font-bold">{item.label}</span>
                 </div>
                 {item.count ? (
                   <span className={cn(
                     "px-2 py-0.5 rounded-lg text-[10px] font-bold",
                     activeTab === item.id ? "bg-white text-orange-600" : "bg-orange-600 text-white"
                   )}>
                     {item.count}
                   </span>
                 ) : null}
               </button>
             ))}
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <header className="flex items-center justify-between mb-12">
              <h1 className="text-4xl font-bold tracking-tighter capitalize">{activeTab}</h1>
              {activeTab === 'projects' && (
                <button 
                  onClick={() => { setEditingProject(null); setIsFormOpen(true); }}
                  className="px-6 py-3 bg-white text-black font-bold rounded-2xl flex items-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-xl"
                >
                  <Plus size={20} /> Add Project
                </button>
              )}
            </header>

            <AnimatePresence mode="wait">
              {activeTab === 'projects' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid sm:grid-cols-2 gap-6"
                >
                  {projects.map((project) => (
                    <div key={project.id} className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden flex flex-col">
                      <div className="h-48 overflow-hidden relative">
                        <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover opacity-60" />
                        <div className="absolute top-4 right-4 flex gap-2">
                           <button 
                             onClick={() => { setEditingProject(project); setIsFormOpen(true); }}
                             className="p-2 bg-black/50 backdrop-blur-xl rounded-xl hover:text-orange-500 transition-colors"
                           >
                             <Edit3 size={18} />
                           </button>
                           <button 
                             onClick={() => handleDeleteProject(project.id!)}
                             className="p-2 bg-black/50 backdrop-blur-xl rounded-xl hover:text-red-500 transition-colors"
                           >
                             <Trash2 size={18} />
                           </button>
                        </div>
                      </div>
                      <div className="p-6 flex-1">
                        <span className="text-[10px] uppercase font-bold tracking-widest text-orange-500">{project.category}</span>
                        <h4 className="text-xl font-bold mt-1 mb-2">{project.title}</h4>
                        <p className="text-sm text-white/40 line-clamp-2">{project.description}</p>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'messages' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {messages.map((msg) => (
                    <div key={msg.id} className="p-8 bg-white/5 border border-white/10 rounded-3xl group">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-bold">{msg.name}</h4>
                          <p className="text-sm text-orange-500">{msg.email}</p>
                        </div>
                        <span className="text-[10px] text-white/20 uppercase font-bold">{msg.createdAt?.toDate ? msg.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                      </div>
                      <p className="text-white/60 leading-relaxed italic">"{msg.message}"</p>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-center py-20 text-white/20">No messages yet.</p>}
                </motion.div>
              )}

              {activeTab === 'notifications' && (
                <motion.div 
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -10 }}
                   className="space-y-4"
                >
                  {notifications.map((note) => (
                    <div key={note.id} className={cn("p-6 border rounded-2xl flex items-center gap-6", note.read ? "bg-white/2 border-white/5" : "bg-white/5 border-orange-500/30")}>
                      <div className="w-10 h-10 bg-orange-600/20 rounded-xl flex items-center justify-center text-orange-500">
                        <Bell size={20} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold">{note.message}</p>
                        <p className="text-xs text-white/40">{note.userEmail}</p>
                      </div>
                      <span className="text-[10px] text-white/20 uppercase font-bold">{note.createdAt?.toDate ? note.createdAt.toDate().toLocaleDateString() : 'Now'}</span>
                    </div>
                  ))}
                  {notifications.length === 0 && <p className="text-center py-20 text-white/20">No notifications.</p>}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>

      <AnimatePresence>
        {isFormOpen && (
          <ProjectForm 
            onClose={() => setIsFormOpen(false)} 
            initialData={editingProject} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ProjectForm({ onClose, initialData }: { onClose: () => void, initialData: Project | null }) {
  const [formData, setFormData] = useState<Partial<Project>>(
    initialData || {
      title: '',
      description: '',
      imageUrl: '',
      liveUrl: '',
      category: 'Web Design',
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      ...formData,
      updatedAt: serverTimestamp(),
      createdAt: initialData ? initialData.createdAt : serverTimestamp(),
    };

    const path = initialData ? `projects/${initialData.id}` : 'projects';
    try {
      if (initialData?.id) {
        await updateDoc(doc(db, 'projects', initialData.id), data);
      } else {
        await addDoc(collection(db, 'projects'), data);
      }
      onClose();
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-2xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[2.5rem] relative z-10 shadow-2xl"
      >
        <h2 className="text-3xl font-bold tracking-tighter mb-8">{initialData ? 'Edit Project' : 'New Project'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-50">Title</label>
              <input 
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 focus:outline-none"
                placeholder="Project Title"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-widest font-bold opacity-50">Category</label>
              <select 
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 focus:outline-none appearance-none"
              >
                <option value="Web Design" className="bg-[#111]">Web Design</option>
                <option value="Graphic Design" className="bg-[#111]">Graphic Design</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs uppercase tracking-widest font-bold opacity-50">Image URL</label>
             <div className="flex gap-4">
               <div className="flex-1 relative">
                 <input 
                   required
                   type="url"
                   value={formData.imageUrl}
                   onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                   className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-orange-600 focus:outline-none"
                   placeholder="https://images.unsplash.com/..."
                 />
                 <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
               </div>
             </div>
          </div>

          <div className="space-y-2">
             <label className="text-xs uppercase tracking-widest font-bold opacity-50">Live URL (Optional)</label>
             <div className="relative">
               <input 
                 type="url"
                 value={formData.liveUrl}
                 onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                 className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl focus:border-orange-600 focus:outline-none"
                 placeholder="https://project.com"
               />
               <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 opacity-30" size={20} />
             </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest font-bold opacity-50">Description</label>
            <textarea 
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl focus:border-orange-600 focus:outline-none resize-none"
              placeholder="Tell us about this creation..."
            />
          </div>

          <div className="flex gap-4 pt-4">
             <button 
               type="button"
               onClick={onClose}
               className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all"
             >
               Cancel
             </button>
             <button 
               type="submit"
               className="flex-1 py-4 bg-orange-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-4px] transition-all shadow-xl shadow-orange-600/20"
             >
               <Save size={20} /> {initialData ? 'Save Changes' : 'Create Project'}
             </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
