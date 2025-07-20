module.exports = (roles) => (req, res, next) => {
  const userRoles = req.user.roles;
  if (!roles.some(role => userRoles.includes(role))) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};