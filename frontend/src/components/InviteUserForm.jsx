// components/InviteUserForm.jsx
import React, { useState } from 'react';
import { api } from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { UserPlus } from 'lucide-react';

export default function InviteUserForm({ tenantSlug }) {
  const { token } = useAuth();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);

  const handleInvite = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api(token).post(`/tenants/${tenantSlug}/invite`, { email, role });
      alert(`User ${email} invited as ${role}`);
      setEmail('');
    } catch (err) {
      console.error(err);
      alert('Invite failed!');
    }
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleInvite}
      className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
    >
      <h3 className="text-white text-lg sm:text-xl font-semibold flex items-center gap-2">
        <UserPlus className="w-5 h-5 text-blue-400" /> Invite User
      </h3>

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        required
      />

      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      >
        <option value="member">Member</option>
        <option value="admin">Admin</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5"
      >
        {loading ? 'Inviting...' : 'Invite'}
      </button>
    </form>
  );
}
