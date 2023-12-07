import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import AuthRepository from "../repositories/authRepository";

import { IUser } from '../interfaces/IAuth';

const JWT_KEY = 'test_private_key';

class AuthService {
  constructor() {}
  async register(requestBody: any) {
    try {
      return await AuthRepository.create(requestBody);
    } catch (err) {
      throw err;
    }
  }

  async login(email: string, password: string) {
    try {
      const user = await AuthRepository.findByEmail(email);
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      return {user}; //return user and user token
    } catch (err) {
      throw err;
    }
  }

  generateToken(user: IUser) {
    const token = jwt.sign({ ...user }, JWT_KEY);
    return token;
  }
  
  async validateToken(token: string) {
    const decoded = jwt.verify(token, JWT_KEY);
    return decoded as IUser;
  }

  async validateRole(user: IUser, role: string) {
    console.log("role >>> ", typeof user.role);
    return user.role === role;
  }
}

export default new AuthService();



