import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Trash2, Save, X } from 'lucide-react';

export default function NoteCard({ note, onDelete, onUpdate, userRole, IconComponent }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const handleSave = () => {
    if (onUpdate) onUpdate(note._id, title, content);
    setIsEditing(false);
  };

  return (
    <motion.div
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 shadow-lg w-full hover:shadow-2xl transition-shadow"
      whileHover={{ scale: 1.02 }}
      layout
    >
      <AnimatePresence>
        {isEditing ? (
          <motion.div
            className="note-content space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <input
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <textarea
              className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 resize-none"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Content"
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <motion.button
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-lg font-semibold shadow-lg"
                onClick={handleSave}
                whileHover={{ scale: 1.05 }}
              >
                <Save className="w-4 h-4" /> Save
              </motion.button>
              <motion.button
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-700 text-white rounded-lg font-semibold shadow-lg"
                onClick={() => setIsEditing(false)}
                whileHover={{ scale: 1.05 }}
              >
                <X className="w-4 h-4" /> Cancel
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="note-content space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-1">
              {IconComponent && <IconComponent className="w-5 h-5 text-yellow-400" />}
              <h3 className="font-bold text-xl text-white">{note.title}</h3>
            </div>
            <p className="text-gray-400 text-xs mb-2">ID: {note._id}</p>
            <p className="text-gray-300">{note.content}</p>

            {userRole === 'member' && (
              <div className="flex justify-end gap-1 mt-3">
                <motion.button
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-l-3xl font-semibold shadow-lg hover:brightness-110 transition"
                  onClick={() => onDelete(note._id)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </motion.button>
                <motion.button
                  className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-blue-400 to-blue-500 text-white rounded-r-3xl font-semibold shadow-lg hover:brightness-110 transition"
                  onClick={() => setIsEditing(true)}
                  whileHover={{ scale: 1.05 }}
                >
                  <Edit className="w-4 h-4" /> Edit
                </motion.button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
