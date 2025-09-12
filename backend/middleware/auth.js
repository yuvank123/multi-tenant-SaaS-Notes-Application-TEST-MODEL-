//auth.js
import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth) return res.status(401).json({ error: 'missing_token' });
    const token = auth.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'missing_token' });


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'invalid_token' });
    }
};