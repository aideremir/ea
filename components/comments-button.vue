<template>
    <app-button @click="toggleComments" class="comments-button" :class="extraClass"
                child-class="btn--has-icon btn--comments comments-button__count" :data-attribute="count">
        <span class="comments-button__label">Comments</span>
    </app-button>
</template>

<script>
    import AppButton from 'components/button';

    export default {
        data() {
            return {
                showComments: false
            }
        },
        props: {
            count: Number,
            extraClass: String
        },
        components: {
            AppButton
        },
        methods: {
            toggleComments() {
                this.showComments = !this.showComments;
                this.$emit('toggle-comments', this.showComments);

                this.$nextTick(() => {
                    if (this.showComments) {
                        window.location.hash = '#comments'
                    } else {
                        window.location.hash = '';
                    }
                });

            }
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .comments-button {
        margin-right: calculateRem(5px);
        &__label {
            margin-left: calculateRem(7px);
            @media (max-width: $md) {
                display: none;
            }
        }
        &__count {
            padding: 0 calculateRem(15px) 0 0;
            @media (max-width: $md) {
                padding: 0;
            }
            &::after {
                content: attr(data-attr);
                font-size: calculateRem(12px);;
                font-weight: $font-weight-bold;
                position: absolute;
                padding: calculateRem(0.5px) calculateRem(3px) 0; // todo create mixin to calculating multiple values
                background-color: $bright-red;
                color: $white;
                right: 0;
                top: -8%;
                border-radius: 1px;
                @media (max-width: $md) {
                    top: -20%;
                    left: 75%;
                    right: auto;
                }
            }
        }
    }

</style>
