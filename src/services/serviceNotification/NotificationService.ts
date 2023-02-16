import { CommHandler } from '../../libs/comm-handler';
import BaseService from '../BaseService';
import { Services } from '../constants';
import * as constants from '../../config/constants';
import configuration from '../../config/configuration';

class NotificationService extends BaseService {
    constructor(res) {
        super(res, Services.NOTIFICATION_SERVICE);
        this.logger.info({ message: 'NotificationService initialized successfully' });
    }

    public async get(templateId) {
        this.logger.info({ message: 'Notification Service called', data: [], option: [] });
        const commHandler = new CommHandler(configuration.notificationServiceUrl);
        const { email, password, name } = this.body;
        const options = {
            method: constants.NotificationService.requestType,
            url: constants.NotificationService.route,
            data: {
                to: [
                    email,
                ],
                metadata: {
                    name,
                    password,
                    link: this.body.link,
                },
                templateId,
                sendViaApi: true,
            },
            // if anyone wants to send header through service level
            // headers: {
            //     traceid: '124',
            // },
        };

        const response = await commHandler.call(
            options,
            this.request,
        );

        return response;
    }
}

export default NotificationService;
