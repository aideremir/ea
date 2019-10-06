<template>
    <div>
        <template v-for="product in products">
            <input :id="'product-' + product.id" type="radio" :value="product.id" :checked="value.id === product.id"
                   @change="onChange(product)" class="product-list__input">
            <label :for="'product-' + product.id" class="product-list__label">
                <span class="product-list__radio"></span>
                <span class="product-list__info">
                    <span class="product-list__name">{{ product.title }}</span>
                    <span class="product-list__description">
                        <template v-if="product.price === 0">
                            {{ product.description }}
                        </template>
                        <template v-else>
                            {{ product.priceMonthlyFormatted }}/month

                        </template>
                    </span>
                </span>
                <span v-if="product.price > 0" class="product-list__price">
                    <span class="product-list__cost" :data-cents="product.coins">
                        <span class="product-list__currency">{{ product.currency }}</span>{{ product.integerPrice }}
                    </span>
                </span>
            </label>
        </template>
    </div>
</template>


<script>

    export default {
        props: {
            value:    Object,
            products: Array
        },
        created() {
            this.products.map((product) => {
                product.currency = product.priceFormatted.match('[^\\d\\.\\,\\s]+')[0];
                product.integerPrice = product.priceFormatted.match('\\d+')[0];
                product.coins = product.priceFormatted.match('\\.\\d{1,2}')[0];
            });
        },
        methods: {
            onChange(product) {
                this.$emit('input', product)
            }
        }
    };

</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .upgrade-form {
        padding: calculateRem(16px);
        background-color: $charcoal-grey;
        &__header {
            padding-bottom: 1.5rem;
            font-size: 1.5rem;
            text-align: center;
            span {
                font-weight: $font-weight-bold;
            }
        }
    }

    .form-steps {
        &__header {
            padding: calculateRem(32px) 0;
            display: flex;
            justify-content: center;
            align-content: center;
            @media (max-width: $md) {
                padding: calculateRem(24px) 0;
            }
        }
        &__step-number {
            margin-right: calculateRem(8px);
            padding: calculateRem(5.5px) calculateRem(10px);
            align-self: center;
            color: $white;
            font-size: .75rem;
            letter-spacing: .3px;
            background-color: $clear-blue;
            border-radius: 4px;
            text-transform: uppercase;
            @media (max-width: $md) {
                font-size: .75rem;
            }
        }
        &__title {
            font-size: 1.5rem;
            display: flex;
            align-items: center;
            @media (max-width: $md) {
                font-size: 1.25rem;
            }
            @media (max-width: $sm) {
                font-size: 1rem;
            }
        }
    }

    .form-steps--small {
        .form-steps__header {
            padding: 0 0 23px;
        }
        .form-steps__title {
            font-size: 1rem;
        }
    }

    .product-list {
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid $cool-grey;
        &__label {
            margin: 0;
            height: calculateRem(100px);
            display: flex;
            align-items: center;
            background-color: $white;
            border-bottom: 1px solid $cool-grey;
            cursor: pointer;
            color: #111418;
            &:last-of-type {
                border-bottom: none;
            }

            @media (max-width: $lg) {
                height: calculateRem(80px);
            }
            @media (max-width: $md) {
                height: calculateRem(63px);
            }

        }
        &__radio {
            margin: 0 calculateRem(16px);
            width: calculateRem(28px);
            height: calculateRem(28px);
            flex: 0 0 auto;
            display: block;
            border: 1px solid $cool-grey;
            border-radius: 50%;
            background-color: $white;
            @media (max-width: $md) {
                width: calculateRem(22px);
                height: calculateRem(22px);
            }
        }
        &__info {
            display: flex;
            flex-direction: column;
        }
        &__name {
            font-size: 1.125rem;
            font-weight: $font-weight-bold;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            @media (max-width: $md) {
                font-size: .875rem;
            }
        }
        &__description {
            line-height: 1.71;
            font-size: .875rem;
            font-weight: $font-weight-light;
            @media (max-width: $md) {
                font-size: .75rem;
            }
        }
        &__price {
            margin-left: auto;
            flex: 0 0 calculateRem(100px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            align-self: stretch;
            background-color: #edf2f6;
            border-left: 1px solid $cool-grey;
            font-size: 2.5rem;
            font-weight: $font-weight-bold;
            letter-spacing: .3px;
            text-shadow: 1px 1px 0 $white;

            &--most-popular {
                &::before {
                    content: 'Most popular';
                    padding: 2px 5px 1px;
                    background-color: $bright-red;
                    border-radius: 1px;
                    font-size: .5625rem;
                    display: block;
                    text-shadow: none;
                    text-transform: uppercase;
                    color: $white;
                    @media (max-width: $md) {
                        padding: 1px 3px;
                        font-size: .33125rem;
                    }
                }
            }

            @media (max-width: $lg) {
                font-size: 1.5rem;
            }
            @media (max-width: $sm) {
                display: none;
            }
        }
        &__cost {
            text-align: center;
            line-height: 1;
            &--free {
                font-size: 2rem;
                @media (max-width: $lg) {
                    font-size: 1.5rem;
                }
                &::after {
                    display: none;
                }
            }
            &::after {
                content: attr(data-cents);
                margin-left: -8px;
                font-size: .875rem;
                font-weight: $font-weight-bold;
                letter-spacing: .2px;
                vertical-align: super;
                @media (max-width: $lg) {
                    font-size: .625rem;
                }
            }
        }
        &__currency {
            font-size: .875rem;
            font-weight: $font-weight-bold;
            letter-spacing: .2px;
            vertical-align: super;
            @media (max-width: $lg) {
                font-size: .625rem;
            }
        }
        &__input[type="radio"] {
            display: none;
            &:checked + .product-list__label {
                background-color: $marigold;
                .product-list__radio {
                    box-shadow: inset 0 0 0 7px rgba(255,255,255,1);
                    background-color: $bright-red;
                    @media (max-width: $md) {
                        box-shadow: inset 0 0 0 5px rgba(255,255,255,1);
                    }
                }
                .product-list__price {
                    background-color: transparent;
                }
            }
        }

    }

    .product-list--small {
        margin-bottom: 1rem;
        .product-list__label {
            height: calculateRem(63px);
        }
        .product-list__radio {
            width: calculateRem(22px);
            height: calculateRem(22px);
        }
        .product-list__name {
            font-size: .875rem;
        }
        .product-list__description {
            font-size: .75rem;
        }
        .product-list__price {
            font-size: 1.5rem;
            flex: 0 0 calculateRem(80px);
            &--most-popular {
                &::before {
                    padding: 1px 3px;
                    font-size: .33125rem;
                }
            }
        }
        .product-list__cost {
            &--free {
                font-size: 1.5rem;
            }
            &::after {
                font-size: .625rem;
            }
        }
        .product-list__currency {
            font-size: .625rem;
        }
        .product-list__input[type="radio"] {
            &:checked + .product-list__label {
                .product-list__radio {
                    box-shadow: inset 0 0 0 5px rgba(255,255,255,1);
                }
            }
        }
    }
</style>
