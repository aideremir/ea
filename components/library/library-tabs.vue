<template>
    <ul class="library__tabs">
        <li v-for="tab in tabs" class="library__tabs-item">
            <nuxt-link :to="route(tab.id)"
                       class="library__tabs-link"
                       :class="{'active': tab.id === currentTabId }">
                {{ tab.title }}
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
    export default {
        props: {
            tabs: Array,
            currentTabId: String,
            route: Function,
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/variables";
    @import "../../assets/scss/mixins/px-rem";

    .library__tabs {
        padding: 0;
        display: flex;
        list-style: none;
        &-item {
            margin-right: calculateRem(16px);
        }
        &-link {
            padding-bottom: calculateRem(20px);
            border-radius: 0;
            transition: 0s;
            letter-spacing: calculateRem(.2px);
            display: block;
            color: $cool-grey;
            &:hover,
            &.active {
                box-shadow: inset 0 -5px 0 0 $bright-red;
                color: $white;
            }
        }
    }

</style>