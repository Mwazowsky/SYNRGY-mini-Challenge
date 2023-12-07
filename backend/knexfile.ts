import path from 'path';
import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'postgresql',
        connection: {
            host: 'localhost',
            database: 'bcr_db_1',
            user: 'postgres',
            password: 'postgres',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path.join(__dirname, 'database', 'migrations'),
        },
        seeds: {
            directory: path.join(__dirname, 'database', 'seeds'),
        },
    },
};

export default config;
