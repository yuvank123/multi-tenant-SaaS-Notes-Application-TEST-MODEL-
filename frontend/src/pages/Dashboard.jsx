import React from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import UpgradeButton from '../components/UpgradeButton.jsx';
import InviteUserForm from '../components/InviteUserForm.jsx';
import NoteList from '../components/NoteList.jsx';
import useNotes from '../hooks/useNotes.js';
import { motion } from 'framer-motion';
import { LogOut, Info, Star } from 'lucide-react';

export default function Dashboard() {
  const { user, logout, tenant } = useAuth();
  const { notes, createNote, deleteNote, updateNote } = useNotes();
  const userRole = user?.role;
  const tenantSlug = tenant?.slug || '';

  if (!user) return <p className="text-center text-gray-300 mt-20">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200">
      {/* Left Side: Functional Work (Scrollable) */}
      <motion.div
        className="w-full md:w-2/3 p-4 md:p-6 flex flex-col space-y-6 backdrop-blur-md bg-white/5 border-b md:border-b-0 md:border-r border-white/10 overflow-y-auto max-h-screen scrollbar-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4 md:gap-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white/90 flex items-center gap-2">
            <Star className="w-5 h-5 text-blue-400" /> Welcome, {user.email}
          </h1>
          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-gray-700 to-gray-600 hover:from-gray-600 hover:to-gray-500 transition text-white text-sm sm:text-base"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>

        {/* Admin Actions */}
        {userRole === 'admin' && tenantSlug && (
          <div className="space-y-4">
            <UpgradeButton tenantSlug={tenantSlug} />
            <InviteUserForm tenantSlug={tenantSlug} />
          </div>
        )}

        {/* Member Actions */}
        {userRole === 'member' && (
          <NoteList
            notes={notes}
            onCreate={createNote}
            onDelete={deleteNote}
            onUpdate={updateNote}
          />
        )}
      </motion.div>

      {/* Right Side: Info Panel */}
      <motion.div
        className="w-full md:w-1/3 flex-shrink-0 flex flex-col p-4 md:p-6 space-y-6 backdrop-blur-md bg-white/5 border-t md:border-t-0 md:border-l border-white/10"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white/90 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-400" /> Dashboard Info
        </h2>

        {/* Stats / Cards */}
        <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.2 }}>
          {userRole !== 'admin' && (
            <motion.div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-600 shadow-lg flex items-center justify-between hover:scale-105 transition-transform text-sm sm:text-base">
              <p className="font-semibold text-white">Total Notes</p>
              <p className="font-bold text-white">{notes.length}</p>
            </motion.div>
          )}

          <motion.div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-teal-500 via-teal-700 to-teal-600 shadow-lg flex items-center justify-between hover:scale-105 transition-transform text-sm sm:text-base">
            <p className="font-semibold text-white">User Role</p>
            <p className="font-bold text-white">{userRole}</p>
          </motion.div>

          <motion.div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-orange-400 via-orange-600 to-orange-500 shadow-lg flex items-center justify-between hover:scale-105 transition-transform text-sm sm:text-base">
            <p className="font-semibold flex items-center gap-1 text-white">
              <Star className="w-4 h-4 text-white" /> Tenant Plan
            </p>
            <p className="font-bold text-white">{tenant?.plan || 'Free'}</p>
          </motion.div>

          {userRole === 'admin' && (
            <motion.div className="p-3 sm:p-4 rounded-xl bg-gradient-to-r from-pink-500 to-red-500 shadow-lg flex items-center justify-between hover:scale-105 transition-transform text-sm sm:text-base">
              <p className="font-semibold text-white">Pending Invites</p>
              <p className="font-bold text-white">3</p>
            </motion.div>
          )}
        </motion.div>

        {/* Recent Notes */}
        <motion.div className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-2 flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-300" /> Recent Activity
          </h3>
          <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
            {notes.slice(-3).reverse().map((note) => (
              <li key={note._id}>
                <span className="font-semibold">{note.title}</span> updated
              </li>
            ))}
            {notes.length === 0 && <li>No recent activity</li>}
          </ul>
        </motion.div>

        {/* Quick Tips */}
        <motion.div className="p-3 sm:p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-lg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <h3 className="text-base sm:text-lg font-semibold text-white/90 mb-2">Quick Tips & Highlights</h3>
          <ul className="list-disc list-inside text-gray-300 text-xs sm:text-sm space-y-1">
            <li>Click on notes to edit or delete.</li>
            <li>Upgrade your plan for more features.</li>
            <li>Invite team members for collaboration.</li>
            <li>Hover on cards to see shiny animation.</li>
            <li>Admins can view pending invites.</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
