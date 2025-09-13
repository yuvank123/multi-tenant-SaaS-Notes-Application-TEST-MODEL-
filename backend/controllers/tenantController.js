//controllers/tenantController.js
import Tenant from '../models/Tenant.js';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';


export const upgradeTenant = async (req, res) => {
    const { slug } = req.params;
    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return res.status(404).json({ error: 'tenant_not_found' });


    // ensure admin belongs to this tenant
    if (tenant._id.toString() !== req.user.tenantId) return res.status(403).json({ error: 'forbidden' });


    tenant.plan = 'pro';
    await tenant.save();
    return res.json({ ok: true, plan: tenant.plan });
};


// Optional: invite user (admin only) — helpful for manual testing
export const inviteUser = async (req, res) => {
    const { slug } = req.params;
    const { email, role } = req.body;
    if (!email || !role) return res.status(400).json({ error: 'missing_fields' });


    const tenant = await Tenant.findOne({ slug });
    if (!tenant) return res.status(404).json({ error: 'tenant_not_found' });
    if (tenant._id.toString() !== req.user.tenantId) return res.status(403).json({ error: 'forbidden' });


    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ error: 'user_exists' });


    const pwd = 'password';
    const hash = await bcrypt.hash(pwd, 10);
    const user = await User.create({ email, passwordHash: hash, role, tenantId: tenant._id });
    return res.status(201).json({ email: user.email, role: user.role });
};

export const getTenantUsers = async (req, res) => {
    const { slug } = req.params;

    try {
        const tenant = await Tenant.findOne({ slug });
        if (!tenant) return res.status(404).json({ error: 'tenant_not_found' });

        // ensure admin belongs to this tenant
        if (tenant._id.toString() !== req.user.tenantId) {
            return res.status(403).json({ error: 'forbidden' });
        }

        const users = await User.find(
            { tenantId: tenant._id },
            { email: 1, role: 1, _id: 0 } // only return email & role for security
        );

        return res.json({ users });
    } catch (err) {
        console.error('Error fetching tenant users:', err);
        return res.status(500).json({ error: 'server_error' });
    }
};