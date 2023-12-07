import { Knex } from 'knex';

const tableName = 'renters';
const rentersData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        phone: '123-456-7890',
        address: '123 Main Street',
    },
    // Add more data as needed
];

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert(rentersData);
}