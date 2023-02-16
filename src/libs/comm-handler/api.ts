/* eslint-disable no-restricted-syntax */
import axios from 'axios';

class CommHandler {
    public url: string;

    constructor(route: string) {
        this.url = route;
    }

    public call = async (options, req) => {
        const { headers } = req;
        const baseUrl = `${this.url}${options.url}`;

        try {
            const transFormHeader = {};
            for (const [key, value] of Object.entries(headers)) {
                if (!key.includes('-')) {
                    transFormHeader[key] = value;
                }
            }
            const data = {
                ...options,
                url: baseUrl,
                headers: {
                    ...transFormHeader,
                    ...options.headers,
                },
            };
            const response = await axios(data);

            return response;
        } catch (error) {
            return error;
        }
    };
}

export default CommHandler;
