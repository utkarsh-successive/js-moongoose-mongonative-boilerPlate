import { SystemResponse } from '../../response-handler';
import { levels } from '../constants/constants';

const enableDebugger = (app, logInstance) => {
    app.use('/debug', (req, res) => {
        // eslint-disable-next-line max-len, no-unused-expressions, no-param-reassign
        logInstance.level === levels.INFO ? logInstance.level = levels.DEBUG : logInstance.level = levels.INFO;
        return res.send(
            SystemResponse.success('Debugger', {
                Debug: logInstance.level === levels.DEBUG,
            }),
        );
    });
};

export default enableDebugger;
