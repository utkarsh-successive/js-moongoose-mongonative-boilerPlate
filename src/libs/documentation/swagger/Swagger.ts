/* eslint-disable class-methods-use-this */
import { Router } from 'express';
import swaggerJSDoc = require('swagger-jsdoc');
import * as swaggerUi from 'swagger-ui-express';

export interface ISwaggerDefinition {
  swaggerDefinition: {
    basePath: string;
    info: {
      description: string;
      title: string;
      version: string;
    },
    securityDefinitions: {
        Bearer: {
          in: string;
          name: string;
          type: string;
        },
    }
  };
}

export default class Swagger {
    public getRouter({ swaggerDefinition }: ISwaggerDefinition) {
        const router = Router();

        router.route('/')
            .get((req, res) => {
                const options = {
                    apis: ['dist/src/**/*.js'],
                    swaggerDefinition,
                };

                const swaggerSpec = swaggerJSDoc(options);

                res.send(swaggerSpec);
            });
        return router;
    }

    public getUI(swaggerUrl: string) {
        const options = {
            swaggerUrl: `${swaggerUrl}.json`,
        };

        return {
            serve: swaggerUi.serve,
            setup: swaggerUi.setup(undefined, options),
        };
    }
}
