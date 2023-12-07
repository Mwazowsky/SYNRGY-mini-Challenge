import { Knex } from 'knex';

const tableName = 'books';
const booksData = [
    {
        title: 'Book Title 1',
        author: 'Author 1',
        isbn: 'ISBN-123456',
        published_year: 2023,
        genre: 'Fiction',
        copies_available: 50,
        total_copies: 100,
        picture: 'book_image_url_1',
    },
    {
        title: 'Book Title 2',
        author: 'Author 2',
        isbn: 'ISBN-789012',
        published_year: 2020,
        genre: 'Non-Fiction',
        copies_available: 30,
        total_copies: 50,
        picture: 'book_image_url_2',
    },
    // Add more data as needed
];

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex(tableName).del();

    // Inserts seed entries
    await knex(tableName).insert(booksData);
}