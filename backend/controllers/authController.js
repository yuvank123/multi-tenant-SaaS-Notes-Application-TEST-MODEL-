// controllers/authController.js
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Tenant from '../models/Tenant.js';
import generateToken from "../utils/generateToken.js";

// Login controller
export const login = async (req, res) => {
    const { email, password } = req.body;
    console.log('🔐 Login attempt for:', email);
    
    if (!email || !password) {
        console.log('❌ Missing credentials');
        return res.status(400).json({ error: "missing_credentials" });
    }

    try {
        const user = await User.findOne({ email });
        console.log('👤 Found user:', user ? 'Yes' : 'No');
        
        if (!user) {
            console.log('❌ User not found');
            return res.status(401).json({ error: "invalid_credentials" });
        }

        console.log('🔍 User details:', {
            email: user.email,
            role: user.role,
            tenantId: user.tenantId
        });

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            console.log('❌ Password mismatch');
            return res.status(401).json({ error: "invalid_credentials" });
        }

        console.log('🔍 Looking for tenant with ID:', user.tenantId);
        const tenant = await Tenant.findById(user.tenantId);
        console.log('🏢 Found tenant:', tenant);

        if (!tenant) {
            console.error('❌ Tenant not found for user:', user.email);
            return res.status(500).json({ error: "tenant_not_found" });
        }

        console.log('🏢 Tenant details:', {
            _id: tenant._id,
            name: tenant.name,
            slug: tenant.slug,
            plan: tenant.plan
        });

        const token = generateToken({
            userId: user._id.toString(),
            tenantId: user.tenantId.toString(),
            role: user.role,
            email: user.email,
        });

        const responseData = {
            token,
            user: { 
                email: user.email, 
                role: user.role, 
                tenantId: user.tenantId 
            },
            tenant: { 
                _id: tenant._id, 
                name: tenant.name, 
                slug: tenant.slug, 
                plan: tenant.plan 
            }
        };

        console.log('✅ Sending response:', responseData);
        res.json(responseData);
    } catch (err) {
        console.error('💥 Login error:', err);
        res.status(500).json({ message: err.message });
    }
};