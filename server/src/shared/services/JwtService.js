import jwt from 'jsonwebtoken';
import { DEFAULTS } from '../../const/env.js';

const JWT_SECRET = DEFAULTS.JWT_SECRET;
const JWT_EXPIRES_IN = DEFAULTS.JWT_EXPIRES_IN;

export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};
