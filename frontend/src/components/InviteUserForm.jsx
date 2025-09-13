// components/InviteUserForm.jsx
import React, { useState, useEffect } from 'react';
import { api } from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { UserPlus, Users, Loader2 } from 'lucide-react';

export default function InviteUserForm({ tenantSlug }) {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('member');
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [inviting, setInviting] = useState(false);
  const [error, setError] = useState('');

  // ✅ Fetch users
  const fetchUsers = async () => {
    setLoadingUsers(true);
    setError('');
    try {
      const res = await api(token).get(`/tenants/${tenantSlug}/users`);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error(err);
      setError('Failed to load users.');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [tenantSlug, token]);

  // ✅ Invite
  const handleInvite = async (e) => {
    e.preventDefault();
    setInviting(true);
    setError('');
    try {
      await api(token).post(`/tenants/${tenantSlug}/invite`, { email, role });
      setEmail('');
      await fetchUsers();
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.error === 'user_exists'
          ? 'User already exists.'
          : 'Failed to invite user.'
      );
    } finally {
      setInviting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* ✅ Invite User Section */}
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-white text-xl font-semibold flex items-center gap-2 mb-4">
          <UserPlus className="w-5 h-5 text-blue-400" /> Invite User
        </h3>
        <form
          onSubmit={handleInvite}
          className="flex flex-col sm:flex-row items-center gap-3"
        >
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-2 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            required
            disabled={inviting}
          />

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="p-2 rounded-lg bg-gray-800 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            disabled={inviting}
          >
            <option value="member">Member</option>
            <option value="admin">Admin</option>
          </select>

          <button
            type="submit"
            disabled={inviting}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-600 text-white rounded-lg font-semibold shadow-md hover:shadow-lg transition transform hover:-translate-y-0.5 disabled:opacity-50"
          >
            {inviting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Inviting...
              </>
            ) : (
              'Invite'
            )}
          </button>
        </form>
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
      </div>

      {/* ✅ Users List Section */}
      <div className="bg-gray-900/30 backdrop-blur-md border border-gray-700/40 rounded-xl p-4 sm:p-6 shadow-lg">
        <h3 className="text-white text-xl font-semibold flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-blue-400" /> Tenant Users
        </h3>

        {loadingUsers ? (
          <div className="text-gray-200">Loading users...</div>
        ) : users.length === 0 ? (
          <p className="text-gray-400">No users found.</p>
        ) : (
          <ul className="divide-y divide-gray-700">
            {users.map((u, i) => (
              <li key={i} className="py-2 flex justify-between items-center">
                <span className="text-white">{u.email}</span>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    u.role === 'admin'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-600 text-gray-200'
                  }`}
                >
                  {u.role}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
