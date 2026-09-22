import bcrypt from 'bcrypt';

class PasswordService {
  async hash(password) {
    return bcrypt.hash(String(password), 12);
  }

  async compare(password, hash) {
    return bcrypt.compare(String(password), hash);
  }
}

export default new PasswordService();
