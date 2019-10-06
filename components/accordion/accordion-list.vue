<template>
   <ul class="accordion-list">
       <accordion-item v-for="item in items" :item="item" :key="item.id"></accordion-item>
   </ul>
</template>

<script>
    import AccordionItem from './accordion-item';

    export default {
        props: {
            items: Array
        },
        components: {
            AccordionItem
        }
    };
</script>

<style lang="scss">
    @import '~assets/scss/variables';

    .accordion-list {
        padding: 0;
        list-style-type: none;
    }

</style>
