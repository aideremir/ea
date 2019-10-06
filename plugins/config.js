const config = require('../config/app.config.js');

import Vue from 'vue';

export default (context) => {
    Vue.prototype.$appConfig = config;
    context.$appConfig = config;
};
