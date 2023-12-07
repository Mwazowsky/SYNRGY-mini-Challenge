import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('books', (table) => {
        table.increments('book_id').primary();
        table.string('title').notNullable();
        table.string('author').notNullable();
        table.string('isbn').notNullable();
        table.integer('published_year').notNullable();
        table.string('genre').notNullable();
        table.integer('copies_available').notNullable();
        table.integer('total_copies').notNullable();
        table.string('picture').notNullable();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTable('books');
}