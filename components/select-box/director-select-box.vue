<template>
    <select-box :items="directorsFiltered" :value="value" item-value-key="id" @input="directorSelected"
                default-label="All directors"
                @searchKeyUp="searchKeyUp"
                searchable/>
</template>

<script>
    import SelectBox from './select-box';

    export default {
        props: {
            value: Number,
        },
        data() {
            return {
                query: ''
            }
        },
        computed: {
            directorsFiltered() {
                const allDirectors = this.$store.state.content.directors;

                if (this.query.length < 3) {
                    return allDirectors;
                }

                return allDirectors.filter(item => {
                    return item.name.toLowerCase().indexOf(this.query) > -1;
                });
            }
        },
        methods: {
            directorSelected(directorId) {
                this.$emit('input', directorId);
            },
            searchKeyUp(e) {
                this.query = e.target.value.toLowerCase();
            },
        },
        components: {
            SelectBox
        }
    };
</script>
