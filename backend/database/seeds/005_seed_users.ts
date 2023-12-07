import { Knex } from 'knex';

const tableName = 'users';
const usersData = [
    {
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
        password: 'hashed_password_1',
        role: 'user',
    },
    {
        first_name: 'Jane',
        last_name: 'Smith',
        email: 'jane.smith@example.com',
        password: 'hashed_password_2',
        role: 'admin',
    },
];

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert(usersData);
}
