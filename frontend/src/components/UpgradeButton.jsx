// components/UpgradeButton.jsx
import React, { useState } from 'react';
import { api } from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowUp } from 'lucide-react';

export default function UpgradeButton({ tenantSlug }) {
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      await api(token).post(`/tenants/${tenantSlug}/upgrade`);
      alert('Tenant upgraded to PRO!');
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert('Upgrade failed!');
    }
    setLoading(false);
  };

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 
                 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1 
                 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400"
    >
      <ArrowUp className="w-5 h-5" />
      {loading ? 'Upgrading...' : 'Upgrade to PRO'}
    </button>
  );
}
