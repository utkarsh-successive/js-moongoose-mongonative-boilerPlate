import BaseRepository from "../libs/BaseRepo/BaseRepository";

class schemaValidation extends BaseRepository {
    protected serviceCollection = {};

    protected moduleService;

    constructor(res, config : string[], moduleService) {
        this.moduleService = moduleService;

        config.forEach((item) => {
            this.serviceCollection[item] = new services[item](res);
        });
    }
}    