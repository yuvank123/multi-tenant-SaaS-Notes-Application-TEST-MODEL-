// routes/tenantRoutes.js
import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';
import { upgradeTenant, inviteUser } from '../controllers/tenantController.js';

const router = express.Router();

// Upgrade plan — admin only
router.post('/:slug/upgrade', requireAuth, requireRole('admin'), upgradeTenant);

// Invite user — admin only
router.post('/:slug/invite', requireAuth, requireRole('admin'), inviteUser);

export default router;
