<template>
    <select-box :items="tagsFiltered"
                :value="value"
                item-value-key="id"
                @input="tagSelected"
                :disabled-values="disabledValues"
                default-label="All Categories"
                @searchKeyUp="searchKeyUp"
                searchable/>
</template>

<script>
    import SelectBox from './select-box';

    export default {
        props: {
            value: Number,
            disabledValues: {
                type: Array,
                default: function () {
                    return [];
                }
            },
        },
        data() {
            return {
                query: ''
            }
        },
        computed: {
            tagsFiltered() {
                const allTags = Object.values(this.$store.state.content.tagList).sort((a, b) => {
                    return (a.name > b.name) ? 1 : -1;
                });

                if (this.query.length < 3) {
                    return allTags;
                }

                return allTags.filter(item => {
                    return item.name.toLowerCase().indexOf(this.query) > -1;
                });
            }
        },
        methods: {
            tagSelected(tagId) {
                this.$emit('input', tagId);
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
