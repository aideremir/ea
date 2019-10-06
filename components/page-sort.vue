<template>
    <div class="page-sort form-dark-theme">
        <popper trigger="click" :options="{placement: 'bottom-start'}">
            <app-button slot="reference" class="page-sort__button" child-class="form-control form-control--small form-control-select">{{ sortOptions[sort] }}</app-button>

            <div class="popper popper--no-arrow popper--fluid">
                <div class="popper__body">
                    <ul class="popper__list">
                        <li v-for="(sortTitle, sortKey) in sortOptions" :class="{'active': sortKey === sort}">
                            <span v-if="sortKey === sort">{{ sortTitle }}</span>
                            <nuxt-link v-else :to="url + '?sort=' + sortKey">{{ sortTitle }}</nuxt-link>
                        </li>
                    </ul>
                </div>
            </div>
        </popper>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs';
    import AppButton from 'components/button';

    export default {
        props: {
            sortOptions: Object,
            sort: String,
            url: String
        },
        components: {
            Popper,
            AppButton
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/mixins/px-rem";

    .page-sort {
        width: calculateRem(200px);
        position: relative;
        &__button {
            width: 100%;
        }
    }

</style>