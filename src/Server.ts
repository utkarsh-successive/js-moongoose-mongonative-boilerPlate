import * as compress from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { errorHandler } from './libs/response-handler';
import { createLogger, enableLoggerInstance, enableDebugger } from './libs/logger';
import loggerConfig from './config/LoggerConfig';
import { EnvVars } from './config/constants';
import notFoundRoute from './libs/routes';
import Swagger from './libs/documentation/swagger/Swagger';
import router from './router';
import Database from './libs/database/Database';
import initSchemaValidationSeeding from './libs/seeding';
export default class Server {
    private app: express.Express;

    private logInstance;

    private db: Database;

    // private baseRepo: BaseRepository;

    // eslint-disable-next-line no-unused-vars
    constructor(private config) {
        this.app = express();
        this.db = new Database();
        // this.baseRepo = new BaseRepository('user');
    }

    get application() {
        return this.app;
    }

    public bootstrap() {
        this.initLogger();
        this.initCompress();
        this.initCookieParser();
        this.initCors();
        this.initJsonParser();
        this.initMethodOverride();
        this.initSwagger();
        this.setupRoutes();

        return this.app;
    }

    /**
   * This will Setup all the routes in the system
   *
   * @returns -Instance of Current Object
   * @memberof Server
   */
    public setupRoutes() {
        const { env, apiPrefix } = this.config;
        const stack = (env === EnvVars.DEV);

        // mount all routes on /api path
        this.app.use(apiPrefix, router);

        // catch 404 and forward to error handler
        this.app.use(notFoundRoute);

        // error handler, send stacktrace only during development
        this.app.use(errorHandler(stack));
    }

    /**
   * This will run the server at specified port after opening up of Database
   *
   * @returns -Instance of Current Object
   */
    public async run() {
    // open Database & listen on port config.port
        const {
            port, env,
        } = this.config;
        try {
            // CacheManager.open();
            await this.db.connect();
            this.app.listen(port);
            // eslint-disable-next-line no-console
            console.log(`|| App is running at port '${port}' in '${env}' mode ||`);
            this.initSeeding();
        } catch (e) {
            return e;
        }
        return this;
    }

    /**
   *
   * @returns Promise
   *
   */

    /**
   * Compression of the output
   */
    private initCompress() {
        this.app.use(compress());
    }

    /**
   * Parse Cookie header and populate req.cookies with an object keyed by the cookie names
   */
    private initCookieParser() {
        this.app.use(cookieParser());
    }

    /**
   *
   * Lets you to enable cors
   */
    private initCors() {
        this.app.use(
            cors({
                optionsSuccessStatus: 200,
                origin: this.config.corsOrigin,
            }),
        );
    }

    /**
   *  - Parses urlencoded bodies & JSON
   */
    private initJsonParser() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    /**
   *
   * Lets you use HTTP verbs such as PUT or DELETE in places where the client doesn't support it.
   */
    private initMethodOverride() {
        this.app.use(methodOverride());
    }

    /**
   * Initialize Swagger
   */
    // To do Need to optimize this function
    private initSwagger() {
        const { swaggerDefinition, swaggerUrl } = this.config;

        const swaggerSetup = new Swagger();

        this.app.use(`${swaggerUrl}.json`, swaggerSetup.getRouter({
            swaggerDefinition,
        }));

        const { serve, setup } = swaggerSetup.getUI(swaggerUrl);

        this.app.use(swaggerUrl, serve, setup);
    }

    private initLogger = () => {
        try {
            this.logInstance = createLogger.createLogInstance(loggerConfig);
            this.app.use(
                enableLoggerInstance(this.logInstance, [
                    { location: 'headers', key: 'x-trace-id' },
                ]),
            );
            enableDebugger(this.application, this.logInstance);
        } catch (err) {
            throw new Error(err);
        }
    };

    // eslint-disable-next-line class-methods-use-this
    private initSeeding() {
        initSchemaValidationSeeding();
    }
}
