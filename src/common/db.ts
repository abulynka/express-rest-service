import { createConnection } from 'typeorm';

export class DB {
  public static async init(): Promise<void> {
    const connection = await createConnection();
    if (!connection) {
      throw new Error('Database is not available');
    }
  }
}
