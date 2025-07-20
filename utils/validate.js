exports.validateUser = (user) => {
  const errors = [];
  if (!user.registerNumber) errors.push('Register number is required');
  if (!user.email) errors.push('Email is required');
  if (!user.roles || !Array.isArray(user.roles) || user.roles.length === 0) {
    errors.push('At least one role is required');
  }
  return errors;
};