/* eslint-disable @typescript-eslint/require-await */
import mysql, { Connection, Pool } from 'mysql2/promise';

class MySQLRepository {
  private connection: Connection | null = null;
  private pool: Pool | null = null

  constructor(private databaseConfig: mysql.PoolOptions) {}

  async connect(): Promise<void> {
    try {
      this.pool = mysql.createPool(this.databaseConfig);
      console.log('Banco de dados conectado.');
    } catch (error: any) {
      console.error('Erro ao conectar com o banco de dados:', error.message);
      throw error;
    }
  }

  async query(sql: string, params?: any[]): Promise<any[]> {
    try {
      if (!this.pool) {
        throw new Error('Connection not established. Call connect() first.');
      }
      const [rows] = await this.pool.query(sql, params);
      return rows as any[];
    } catch (error) {
      console.error('Error executing SQL query:', error);
      throw error;
    }
  }
}

export default new MySQLRepository({
  host: process.env.DB_HOSTNAME || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'agbnew'
});
