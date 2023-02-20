import { isValidObjectId } from '../../libs/MongoUtils';

export default Object.freeze({
    create: {
        first_name: {
            errorMessage: 'First Name is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'First Name should be at least 2 chars long',
                options: { min: 2 },
            },
        },
        last_name: {
            errorMessage: 'Last Name is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'Last Name should be at least 2 chars long',
                options: { min: 2 },
            },
        },
    },

    delete: {
        id: {
            custom: {
                options: (id: string) => isValidObjectId(id),
            },
            errorMessage: 'Bad ID format',
            in: ['body'],
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
            in: ['body'],
        },
        first_name: {
            errorMessage: 'First Name is wrong!',
            in: ['body'],
        },
        last_name: {
            errorMessage: 'Last Name is wrong!',
            in: ['body'],
        },

    },

    registration: {
        email: {
            isEmail: {
                bail: true,
            },
            in: ['body'],
            errorMessage: 'Please enter valid Email',
            isLength: {
                errorMessage: 'Character should be 1',
                options: { min: 1 },
            },
        },
        password: {
            errorMessage: 'Last Name is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'Last Name should be at least 2 chars long',
                options: { min: 2 },
            },
        },
    },

});
