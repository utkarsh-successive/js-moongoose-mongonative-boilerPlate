import { isValidObjectId } from '../../libs/MongoUtils';

export default Object.freeze({
    create: {
        title: {
            errorMessage: 'title is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'title should be at least 2 chars long',
                options: { min: 2 },
            },
        },
        description: {
            errorMessage: 'description is wrong!',
            in: ['body'],
            isLength: {
                errorMessage: 'Description should be at least 2 chars long',
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
            in: ['body'],
        },
        status: {
            errorMessage: 'Bad ID format',
            in: ['body'],
        },
    },

});
