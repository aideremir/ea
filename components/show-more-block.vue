<template>
    <div class="show-more-block" :class="extraClass">
        <h3 v-if="title" class="show-more-block__title">
            {{ title }}
        </h3>
        <div class="show-more-block__body" :class="{'show-more-block__body--show' : showMore}">
            <slot></slot>
        </div>
        <app-button v-if="!showMore" @click.native="showMore = !showMore" class="show-more-block__button">
            Show more
        </app-button>
    </div>
</template>

<script>
    import AppButton from 'components/button';

    export default {
        props: {
            title:      String,
            content:    String,
            extraClass: {}
        },
        data() {
            return {
                showMore: false
            }
        },
        watch:    {
            '$route': function () {
                this.showMore = false;
            }
        },
        components: {
            AppButton
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .show-more-block {
        font-size: .9375rem;
        &__title {
            margin-bottom: .5rem;
            font-size: 1em;
            line-height: 1.2;
            letter-spacing: .4px;
            font-weight: $font-weight-normal;
        }
        &__body {
            font-weight: $font-weight-light;
            color: $light-grey;
            font-size: 1em;
            line-height: 1.2;
            height: 6em; // line-height (1.2) * number of lines (5)
            overflow: hidden;
            letter-spacing: .4px;
            &--show {
                height: auto;
            }
        }
        &__button {
            padding: 0;
            background-color: transparent;
            border: none;
            letter-spacing: .4px;
            line-height: 1.2;
            cursor: pointer;
            color: $white;
        }
    }

    .show-more-block--footer {
        margin-bottom: 1.5rem;
        @media (max-width: $lg) {
            margin-bottom: 3rem;
            text-align: center;
        }
        .show-more-block__button {
            color: $pinkish-red;
        }
    }

    .show-more-block--profile {
        .show-more-block__body {
            color: $white;
            height: 3.6em; // line-height (1.2) * number of lines (3)
            &--show {
                height: auto;
            }
        }
    }

</style>