//roles.js
export const requireRole = (role) => (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'not_authenticated' });
    if (req.user.role !== role) return res.status(403).json({ error: 'forbidden' });
    next();
};