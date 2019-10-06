<template>
    <select-box :items="performers" :value="value" item-value-key="id" @input="performerSelected"
                default-label="All performers" searchable
                @searchKeyUp="debouncedQueryPerformers"/>
</template>

<script>
    import SelectBox from './select-box';
    import api from 'api/dispatcher';
    import debounce from 'lodash.debounce';

    export default {
        props: {
            value: Number
        },
        data() {
            return {
                performers: [],
                performersInit: [],
            };
        },
        mounted() {
            api.performers(25).then(response => {
                this.performers = this.performersInit = response.data;
            });
        },
        methods: {
            debouncedQueryPerformers: debounce(function (e) {
                this.queryPerformers(e);
            }, 500),
            queryPerformers(e) {
                const query = e.target.value;
                if (query.length < 3) {
                    this.performers = this.performersInit;
                    return;
                }

                api.performers(25, query).then(response => {
                    this.performers = response.data;
                });
            },
            performerSelected(performerId) {
                if (performerId === null) {
                    this.performers = this.performersInit;
                }

                this.$emit('input', performerId);
            },
        },
        components: {
            SelectBox
        }
    };
</script>
