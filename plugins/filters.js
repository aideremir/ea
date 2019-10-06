import formatDate from 'date-fns/format';
import Vue from 'vue';

Vue.filter('humanDate', function (value, format) {
    if (!value) {
        return '';
    }

    if (!format) {
        return value;
    }

    return formatDate(value, format);
});
