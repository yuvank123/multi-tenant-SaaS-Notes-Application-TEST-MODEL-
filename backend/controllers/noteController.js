//controllers/noteController.js
import Note from '../models/Note.js';
import Tenant from '../models/Tenant.js';

const FREE_LIMIT = 3;

export const createNote = async (req, res) => {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ error: 'missing_title' });

    const tenantId = req.user.tenantId;
    const tenant = await Tenant.findById(tenantId);
    if (!tenant) return res.status(404).json({ error: 'tenant_not_found' });

    if (tenant.plan === 'free') {
        const count = await Note.countDocuments({ tenantId });
        if (count >= FREE_LIMIT) return res.status(403).json({ error: 'note_limit_reached' });
    }

    const note = await Note.create({
        title,
        content: content || '',
        tenantId,
        createdBy: req.user.userId
    });
    return res.status(201).json(note);
};

export const listNotes = async (req, res) => {
    const tenantId = req.user.tenantId;
    const notes = await Note.find({ tenantId }).sort({ createdAt: -1 });
    return res.json(notes);
};

export const getNote = async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const note = await Note.findOne({ _id: id, tenantId });
    if (!note) return res.status(404).json({ error: 'not_found' });
    return res.json(note);
};

export const updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const tenantId = req.user.tenantId;
    const note = await Note.findOne({ _id: id, tenantId });
    if (!note) return res.status(404).json({ error: 'not_found' });

    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    await note.save();
    return res.json(note);
};

export const deleteNote = async (req, res) => {
    const { id } = req.params;
    const tenantId = req.user.tenantId;
    const note = await Note.findOneAndDelete({ _id: id, tenantId });
    if (!note) return res.status(404).json({ error: 'not_found' });
    return res.json({ ok: true });
};
