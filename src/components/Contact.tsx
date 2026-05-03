import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail, MapPin, Instagram, Linkedin, Twitter, MessageSquare } from 'lucide-react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/error-handler';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    const path = 'messages';
    try {
      await addDoc(collection(db, path), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      // Add notification for admin
      await addDoc(collection(db, 'notifications'), {
        type: 'contact',
        message: `New message received from ${formData.name}`,
        userEmail: formData.email,
        createdAt: serverTimestamp(),
        read: false
      });
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, path);
      setStatus('error');
    }
  };

  const socialLinks = [
    { icon: <Instagram />, href: '#', label: 'Instagram' },
    { icon: <Linkedin />, href: '#', label: 'LinkedIn' },
    { icon: <Twitter />, href: '#', label: 'Twitter' },
    { icon: <MessageSquare />, href: 'https://wa.me/yournumber', label: 'WhatsApp' },
  ];

  return (
    <section id="contact" className="py-24 px-6 bg-[#080808] border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[10px] uppercase tracking-[0.4em] text-indigo-500 font-bold mb-4">Get In Touch</h2>
            <h3 className="text-4xl md:text-5xl font-serif italic mb-8 tracking-tighter text-white">Let's Create <span className="not-italic font-black font-sans uppercase text-3xl md:text-4xl text-white">Something</span> Impactful</h3>
            
            <p className="text-gray-400 text-sm mb-12 max-w-lg leading-relaxed uppercase tracking-tighter">
              Whether you have a project in mind, want to discuss a potential collaboration, or just want to say hi, I'm always open to talking about design and tech.
            </p>

            <div className="space-y-4 mb-12">
              <div className="flex items-center gap-6 group p-4 border border-white/5 bg-white/[0.02] hover:border-indigo-500/30 transition-all">
                <div className="w-10 h-10 bg-indigo-600/10 flex items-center justify-center text-indigo-500 rounded-sm">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Contact Number</p>
                  <p className="text-sm font-black uppercase tracking-widest">+91 93066 60977</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group p-4 border border-white/5 bg-white/[0.02] hover:border-indigo-500/30 transition-all">
                <div className="w-10 h-10 bg-indigo-600/10 flex items-center justify-center text-indigo-500 rounded-sm">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Inquiry Email</p>
                  <p className="text-sm font-black uppercase tracking-widest">jainkrish51952@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  title={social.label}
                  className="w-10 h-10 bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-indigo-500/50 transition-all"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[#0c0c0c] border border-white/5 p-8 md:p-12 relative overflow-hidden"
          >
            <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold mb-10">Direct Inquiry</h4>
            
            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <input 
                    required
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-indigo-500 transition-colors text-white"
                    placeholder="NAME"
                  />
                </div>
                <div className="space-y-2">
                  <input 
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-indigo-500 transition-colors text-white"
                    placeholder="EMAIL"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 p-4 text-[10px] uppercase font-bold tracking-widest focus:outline-none focus:border-indigo-500 transition-colors text-white resize-none"
                  placeholder="MESSAGE"
                />
              </div>

              <button 
                disabled={status === 'submitting'}
                className="w-full py-4 bg-indigo-600 text-white font-black uppercase text-xs tracking-[0.3em] hover:bg-indigo-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {status === 'submitting' ? 'Transmitting...' : status === 'success' ? 'Sent Successfully' : 'Deliver Message'}
                <Send size={14} />
              </button>
              
              {status === 'success' && <p className="text-green-500 text-center text-[10px] font-bold uppercase tracking-widest">Signal received. Will respond soon.</p>}
              {status === 'error' && <p className="text-red-500 text-center text-[10px] font-bold uppercase tracking-widest">Transmission failed. Try again.</p>}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
