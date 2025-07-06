export const PASSWORD_RULES = {
  minLength: 8,
  maxLength: 16,
  requireUppercase: true,
  requireSpecialChar: true
};

export const NAME_RULES = {
  minLength: 20,
  maxLength: 60
};

export const ADDRESS_RULES = {
  maxLength: 400
};

export const ROLES = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  STORE_OWNER: 'STORE_OWNER'
};
