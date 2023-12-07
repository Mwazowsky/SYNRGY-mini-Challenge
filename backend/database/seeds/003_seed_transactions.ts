import { Knex } from 'knex';

const tableName = 'transactions';
const transactionsData = [
    {
        renter_id: 1, // Insert a valid renter_id
        car_id: 1,    // Insert a valid car_id
        checkout_date: '2023-11-21',
        due_date: '2023-12-21',
        return_date: '2023-12-21',
        fine_amount: 50.75,
    },
    // Add more data as needed
];

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert(transactionsData);
}