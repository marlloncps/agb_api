import MySQLRepository from '@/infra/MySQLRepository';
import { userCredentials } from './entities/user.entities';

class UserService {
  private db = MySQLRepository;

  async login(username: string, password: string) {
    const users = await this.db.query('SELECT * from accounts WHERE user = ?', [
      username,
    ]);
    if (!users || users.length == 0) return { code: 400, message: 'Usuário ou senha inválidos' };
    if (users[0].password === password) {
      return { code: 200, message: 'Bem vindo a cidade' };
    }
    return { code: 400, message: 'Usuário ou senha inválidos' };
  }

  async register(username: string, password: string) {
    const user = await this.db.query(
      'INSERT INTO accounts SET user = ?, password = ?, discord = 0, email = 0, serial = 0, coins = 10000, avatar = 1, whitelist = 1, permissions = 1',
      [username, password],
    );
    return user;
  }
}

export default new UserService();
