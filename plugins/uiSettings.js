import uiSettings, {UI_SETTINGS_COOKIE_NAME} from 'node_modules/ea-components/services/uiSettings';

export default (context) => {
    if (process.server && !process.static && context.req.headers.cookie) {
        let serverCookie = require('cookie');

        let settingsJson = serverCookie.parse(context.req.headers.cookie)[UI_SETTINGS_COOKIE_NAME];

        if (settingsJson) {
            uiSettings.setSettings(JSON.parse(settingsJson));
        } else {
            uiSettings.setSettings({});
        }
    }
};
