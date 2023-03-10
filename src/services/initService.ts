class InitService {
    protected serviceCollection = {};

    protected moduleService;

    constructor(res, config : string[], moduleService) {
        this.moduleService = moduleService;
    }

    // eslint-disable-next-line class-methods-use-this
    public get = (key) => {
        const Services = {
            moduleService: this.moduleService,
            initializedService: this.serviceCollection[key],
        };
        return Services;
    };
}

export default InitService;
