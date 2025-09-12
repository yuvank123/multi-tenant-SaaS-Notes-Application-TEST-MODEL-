import React, { useState, useEffect } from 'react';
import NoteCard from './NoteCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import { Plus, Star, Zap, Bell, Heart, Coffee, Book } from 'lucide-react';

export default function NoteList({ notes, onCreate, onDelete, onUpdate }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const { user } = useAuth();
  const userRole = user?.role || 'member';

  if (userRole !== 'admin' && userRole !== 'member') {
    return <p className="text-gray-400">You do not have permission to view notes.</p>;
  }

  const handleCreate = (e) => {
    e.preventDefault();
    if (userRole === 'member' || userRole === 'admin') {
      onCreate(title, content);
      setTitle('');
      setContent('');
    }
  };

  // Icons array for notes
  const icons = [Star, Zap, Bell, Heart, Coffee, Book];

  // Function to update masonry row spans
  const updateRowSpan = () => {
    const cards = document.querySelectorAll('.note-card');
    cards.forEach((card) => {
      const rowHeight = 28; // matches auto-rows-[28px]
      const rowGap = 20; // matches gap-5 (~20px)
      const contentHeight = card.querySelector('.note-content').getBoundingClientRect().height;
      const rowSpan = Math.ceil((contentHeight + rowGap) / (rowHeight + rowGap));
      card.style.gridRowEnd = `span ${rowSpan}`;
    });
  };

  // Update row spans on mount, notes change, or window resize
  useEffect(() => {
    updateRowSpan();
    window.addEventListener('resize', updateRowSpan);
    return () => window.removeEventListener('resize', updateRowSpan);
  }, [notes]);

  // Update row spans when a note is edited (content change)
  useEffect(() => {
    const observer = new MutationObserver(() => {
      updateRowSpan();
    });
    const cards = document.querySelectorAll('.note-card .note-content');
    cards.forEach((card) => observer.observe(card, { childList: true, subtree: true, characterData: true }));
    return () => observer.disconnect();
  }, [notes]);

  return (
    <div>
      {/* Add Note Form */}
      {userRole === 'member' && (
  <motion.form
    onSubmit={handleCreate}
    className="mb-6 p-3 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg flex flex-col md:flex-row gap-3 items-center"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <input
      className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 backdrop-blur-sm transition"
      placeholder="Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <input
      className="flex-1 p-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 backdrop-blur-sm transition"
      placeholder="Content"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      required
    />
    <motion.button
      type="submit"
      className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-2xl transition transform"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Plus className="w-5 h-5" /> Add Note
    </motion.button>
  </motion.form>
)}


      {/* Masonry Notes Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-[30px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {notes.map((note, idx) => {
          const IconComponent = icons[idx % icons.length]; // cycle through icons
          return (
            <div key={note._id} className="note-card">
              <NoteCard
                note={note}
                onDelete={onDelete}
                onUpdate={onUpdate}
                userRole={userRole}
                IconComponent={IconComponent} // pass icon to NoteCard
              />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
