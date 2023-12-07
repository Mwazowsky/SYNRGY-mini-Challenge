import knex, { Knex } from 'knex';

class Database {
  private static instance: Database;
  private _db: Knex;

  constructor(config: any) {
    this._db = knex(config);
  }

  public static getInstance(config: any): Database {
    if (!Database.instance) {
      Database.instance = new Database(config);
    }
    return Database.instance;
  }

  get db(): Knex {
    return this._db;
  }
}

const config = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'bcr_db',
    user: 'postgres',
    password: 'postgres',
  }
};

const database = Database.getInstance(config).db;

export default database;
