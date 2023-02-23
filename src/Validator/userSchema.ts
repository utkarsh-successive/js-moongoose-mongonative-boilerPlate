export const validationMiddleware = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['first_name', 'last_name', 'email', 'password'],
    properties: {
      first_name: {
        bsonType: 'string',
        minLength: 3,
        maxLength: 50
      },
      last_name: {
        bsonType: 'string',
        minLength: 3,
        maxLength: 50
      },
      
      password: {
        bsonType: 'string',
        minimum: 8,
        maximum: 15
      },
      email: {
        bsonType: 'string',
        pattern: /^\S+@\S+\.\S+$/
      }
    }
  }
};

