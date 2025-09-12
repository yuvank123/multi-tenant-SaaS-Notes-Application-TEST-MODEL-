import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createNote, listNotes, getNote, updateNote, deleteNote } from '../controllers/noteController.js';

const router = express.Router();
router.use(requireAuth);

//CRUD routes
router.post('/', createNote);
router.get('/', listNotes);
router.get('/:id', getNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);


export default router;