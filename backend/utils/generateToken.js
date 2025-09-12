import jwt from 'jsonwebtoken';


export default function generateToken(payload) {
if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET missing');
// sign token for 7 days
return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
}