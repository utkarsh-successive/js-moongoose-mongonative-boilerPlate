import { isNumberValid, isValidObjectId } from '../../libs/MongoUtils';

export default Object.freeze({
    create: {
        name: {
            isLength: {
                errorMessage: 'name should be at least 2 chars long',
                options: { min: 2 },
            },
        },
        email: {
            isEmail: {
                errorMessage: 'Please provide valid email',
            },
        },
        age: {
            custom: {
                options: (value: number) => isNumberValid(value, 'age'),
            },
        },
        'address.flat_no': {
            custom: {
                options: (value: number) => {
                    if (typeof value !== 'number' || value <= 0) {
                        throw new Error('flat no. should be greater than 0');
                    }
                    return true;
                },
            },
        },
        'address.state': {
            notEmpty: true,
            errorMessage: 'state cannot be empty',
        },
        'address.city': {
            notEmpty: true,
            errorMessage: 'city cannot be empty',
        },
    },
    delete: {
        id: {
            custom: {
                options: (id: string) => isValidObjectId(id),
            },
            errorMessage: 'Bad ID format',
            in: ['param'],
        },
    },

    get: {
        id: {
            custom: {
                options: (id: string) => isValidObjectId(id),
            },
            errorMessage: 'Bad ID format',
            in: ['params'],
        },
    },

    list: {
        limit: {
            errorMessage: 'limit is wrong',
            in: ['query'],
            isInt: true,
            optional: true,
            toInt: true,
        },
        skip: {
            errorMessage: 'skip count is wrong',
            in: ['query'],
            isInt: true,
            optional: true,
            toInt: true,
        },
    },

    update: {
        id: {
            custom: {
                options: (id: string) => isValidObjectId(id),
            },
            errorMessage: 'Bad ID format',
            in: ['params'],
        },
        name: {
            isLength: {
                errorMessage: 'name should be at least 2 chars long',
                options: { min: 2 },
            },
            optional: true,
        },
        email: {
            isEmail: {
                errorMessage: 'Please provide valid email',
            },
            optional: true,
        },
        age: {
            custom: {
                options: (value: number) => isNumberValid(value, 'age'),
            },
            optional: true,
        },
        'address.flat_no': {
            custom: {
                options: (value: number) => {
                    if (typeof value !== 'number' || value <= 0) {
                        throw new Error('flat no. should be greater than 0');
                    }
                    return true;
                },
            },
            optional: true,
        },
        'address.state': {
            notEmpty: true,
            errorMessage: 'state cannot be empty',
            optional: true,
        },
        'address.city': {
            notEmpty: true,
            errorMessage: 'city cannot be empty',
            optional: true,
        },
        optional: true,
    },
    bulkInsert: [
        {
        name: {
            isLength: {
                errorMessage: 'name should be at least 2 chars long',
                options: { min: 2 },
            },
        },
        email: {
            isEmail: {
                errorMessage: 'Please provide valid email',
            },
        },
        age: {
            custom: {
                options: (value: number) => isNumberValid(value, 'age'),
            },
        },
        'address.flat_no': {
            custom: {
                options: (value: number) => {
                    if (typeof value !== 'number' || value <= 0) {
                        throw new Error('flat no. should be greater than 0');
                    }
                    return true;
                },
            },
        },
        'address.state': {
            notEmpty: true,
            errorMessage: 'state cannot be empty',
        },
        'address.city': {
            notEmpty: true,
            errorMessage: 'city cannot be empty',
        },
    
    }
],

});
