import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', (table) => {
        table.increments('user_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('password');
        table.string('role');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('users');
}