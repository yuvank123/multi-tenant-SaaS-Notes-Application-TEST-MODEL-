import { useState, useEffect } from 'react';
import { api } from '../utils/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function useNotes() {
  const { token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const res = await api(token).get('/notes');
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Create note
  const createNote = async (title, content) => {
    await api(token).post('/notes', { title, content });
    fetchNotes();
  };

  // Update note
  const updateNote = async (id, title, content) => {
    await api(token).put(`/notes/${id}`, { title, content });
    fetchNotes();
  };

  // Delete note
  const deleteNote = async (id) => {
    await api(token).delete(`/notes/${id}`);
    fetchNotes();
  };

  // Get single note
  const getNoteById = async (id) => {
    try {
      const res = await api(token).get(`/notes/${id}`);
      return res.data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return { notes, loading, createNote, updateNote, deleteNote, getNoteById };
}
