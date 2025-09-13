// routes/tenantRoutes.js
import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';
import { upgradeTenant, inviteUser, getTenantUsers } from '../controllers/tenantController.js';

const router = express.Router();

// Upgrade plan — admin only
router.post('/:slug/upgrade', requireAuth, requireRole('admin'), upgradeTenant);

// Invite user — admin only
router.post('/:slug/invite', requireAuth, requireRole('admin'), inviteUser);

// ✅ Get all users of a tenant — admin only
router.get('/:slug/users', requireAuth, requireRole('admin'), getTenantUsers);

export default router;
