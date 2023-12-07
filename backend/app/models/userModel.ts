import { Model } from 'objection';

class User extends Model {
  password: any;
  static get tableName(): string {
    return 'users';
  }

  static get idColumn(): string {
    return 'user_id'; // Specify the actual primary key column name here
  }

  static get jsonSchema(): object {
    return {
      type: 'object',
      required: ['first_name', 'last_name', 'email', 'password', 'role'],
      properties: {
        user_id: { type: 'integer' },
        first_name: { type: 'string', minLength: 1, maxLength: 255 },
        last_name: { type: 'string', minLength: 1, maxLength: 255 },
        email: { type: 'string', minLength: 1, maxLength: 255 },
        password: { type: 'string', minLength: 1, maxLength: 255 },
        role: { type: 'string', minLength: 1, maxLength: 10 },
      },
    };
  }
}

export default User;
