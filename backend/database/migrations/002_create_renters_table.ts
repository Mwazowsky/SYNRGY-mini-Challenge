import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('renters', (table) => {
        table.increments('renter_id').primary();
        table.string('first_name');
        table.string('last_name');
        table.string('email');
        table.string('phone');
        table.text('address');
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('renters');
}
