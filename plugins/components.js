import Vue from 'vue';
import VueTimeago from 'vue-timeago';
import Vue2TouchEvents from 'vue2-touch-events'

Vue.use(Vue2TouchEvents);

Vue.use(VueTimeago, {
    name:    'timeago', // component name, `timeago` by default
    locale:  'en-US'
});
