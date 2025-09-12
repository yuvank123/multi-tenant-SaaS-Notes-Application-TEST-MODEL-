import React, { useState } from 'react';
import { api } from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, Info, Layers } from 'lucide-react';

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await api().post('/auth/login', { email, password });

      if (!res.data.tenant) {
        setError('Login successful but tenant data missing');
        return;
      }
      if (!res.data.tenant.slug) {
        setError('Tenant data incomplete');
        return;
      }

      login(res.data.user, res.data.token, res.data.tenant);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-200 overflow-hidden">
      
      {/* Left Side: Login Form */}
      <motion.div
        className="w-full md:w-1/2 flex items-center justify-center p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-md p-8 bg-gradient-to-tl from-gray-800/80 via-gray-900/80 to-black/80 backdrop-blur-xl border border-gray-700 rounded-3xl shadow-2xl space-y-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-1 text-center text-white tracking-wide flex items-center justify-center gap-2">
            Welcome Back
            <span className="bg-pink-500 text-white text-xs px-2 py-1 rounded-full uppercase font-semibold animate-pulse">
              BETA
            </span>
          </h2>

          <AnimatePresence>
            {error && (
              <motion.p
                className="text-red-500 mb-4 text-center font-medium"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="relative">
            <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <motion.input
              className="w-full pl-10 p-3 rounded-xl bg-gray-700/70 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <motion.input
              type="password"
              className="w-full pl-10 p-3 rounded-xl bg-gray-700/70 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 transition"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              whileFocus={{ scale: 1.02 }}
            />
          </div>

          <motion.button
            type="submit"
            className={`w-full p-3 rounded-xl text-white font-semibold ${
              loading
                ? 'bg-blue-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-indigo-500 hover:to-blue-600'
            } transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </motion.button>

          <p className="text-center text-gray-400 mt-2 text-sm">
            Don't have an account?{' '}
            <span className="text-blue-500 font-medium cursor-pointer hover:underline">Sign Up</span>
          </p>
        </motion.form>
      </motion.div>

      {/* Right Side: Info Section */}
      <motion.div
        className="hidden md:flex w-full md:w-1/2 items-center justify-center p-12 bg-gradient-to-tr from-gray-800 to-gray-900"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="text-center space-y-6 max-w-lg relative">
          {/* BETA Ribbon */}
          <div className="absolute top-0 right-0 bg-pink-500 text-white px-4 py-1 rounded-bl-lg font-bold tracking-wide uppercase animate-pulse shadow-lg">
            Beta Version
          </div>

          <Info className="mx-auto w-16 h-16 text-blue-400 animate-bounce" />
          <h3 className="text-4xl font-bold tracking-wide text-white">
            Multi-Tenant SaaS Notes App
          </h3>
          <p className="text-gray-400 text-lg">
            Manage notes securely across multiple companies. Each tenant has its own users, role-based access, and
            subscription limits. Built for collaboration, real-time updates, and modern workflow.
          </p>

          <motion.div className="grid grid-cols-2 gap-4 mt-6">
            <motion.div className="p-4 rounded-xl bg-gray-700/50 backdrop-blur-md shadow-lg flex flex-col items-center justify-center hover:scale-105 transition">
              <Layers className="w-8 h-8 text-blue-400 mb-2" />
              <p className="text-white font-semibold text-sm">Multi-Tenant</p>
            </motion.div>
            <motion.div className="p-4 rounded-xl bg-gray-700/50 backdrop-blur-md shadow-lg flex flex-col items-center justify-center hover:scale-105 transition">
              <Lock className="w-8 h-8 text-green-400 mb-2" />
              <p className="text-white font-semibold text-sm">Secure</p>
            </motion.div>
            <motion.div className="p-4 rounded-xl bg-gray-700/50 backdrop-blur-md shadow-lg flex flex-col items-center justify-center hover:scale-105 transition">
              <Info className="w-8 h-8 text-yellow-400 mb-2" />
              <p className="text-white font-semibold text-sm">Real-Time Updates</p>
            </motion.div>
            <motion.div className="p-4 rounded-xl bg-gray-700/50 backdrop-blur-md shadow-lg flex flex-col items-center justify-center hover:scale-105 transition">
              <Mail className="w-8 h-8 text-pink-400 mb-2" />
              <p className="text-white font-semibold text-sm">Collaboration</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
