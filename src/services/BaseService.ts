class BaseService {
    protected logger;

    protected config;

    protected body;

    protected headers;

    protected request;

    constructor(res, serviceName) {
        const { locals: { logger }, req } = res;
        const { body, headers } = req;
        this.request = req;
        this.headers = headers;
        this.body = body;
        this.logger = logger.child({
            service: serviceName,
        });
        this.logger.info({ message: ` Initializing ${serviceName}` });
    }
}
export default BaseService;
