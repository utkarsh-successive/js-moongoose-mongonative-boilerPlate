const userSchemaValidation = {
    validator: {
        $jsonSchema: {
            bsonType: 'object',
            title: 'User Validation',
            required: ['name', 'email', 'age', 'mobile_no', 'address', '_id'],
            properties: {
                _id: { bsonType: 'objectId' },
                name: {
                    bsonType: 'string',
                    description: '\'name\' must be a string and is required',
                },
                age: {
                    bsonType: 'int',
                    minimum: 0,
                    description: '\'age\' must be at least 0 and is required',
                },
                email: {
                    bsonType: 'string',
                    description: '\'email\' must be a string and is required',
                },
                mobile_no: {
                    bsonType: 'string',
                    description: '\'mobile_no\' must be a string and is required',
                },
                address: {
                    bsonType: 'object',
                    title: 'Address Schema Validation failed',
                    required: ['flat_no', 'city', 'state'],
                    properties: {
                        flat_no: {
                            bsonType: 'int',
                            description: '\'flat_no\' must be atleast 1 and is required',
                            minimum: 1,
                        },
                        city: {
                            bsonType: 'string',
                            description: '\'city\' must be a string and is required',
                        },
                        state: {
                            bsonType: 'string',
                            description: '\'state\' must be a string and is required',
                        },
                    },
                },
            },
        },
    },
    validationLevel: 'strict',
    validationAction: 'error',
};

export default userSchemaValidation;
