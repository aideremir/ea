<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col features-wr">
                <div class="ea-girl">
                    <img src="../assets/images/EA-girl.jpg" alt="" class="ea-girl__image">
                </div>
                <div class="features">
                    <h2 class="features__title">You’re just moments away  from full access to over <strong>10,000 scenes</strong> of the most <strong>hardcore porn</strong> in existence!</h2>
                    <div class="features__list-wr">
                        <ul class="features__list features__list--dos">
                            <li>Weekly updates</li>
                            <li>True 4K and HD videos</li>
                            <li>Behind-the-scenes footage</li>
                            <li>Hi-res photo sets</li>
                            <li>Fully mobile compatible</li>
                            <li>Discrete billing</li>
                            <li>24/7 support</li>
                            <li>Security & privacy</li>
                        </ul>
                        <ul class="features__list features__list--donts">
                            <li>Pre-Checked cross sales</li>
                            <li>Unexpected charges</li>
                            <li>Unresponsive support</li>
                            <li>Difficulty canceling</li>
                            <li>Fraud</li>
                            <li>Infrequent updates</li>
                            <li>Low quality video</li>
                            <li>Unreliable streaming</li>
                        </ul>
                    </div>
                    <span class="ea-customer-trust">
                        Evil Angel - Over 29 Years of Customer Trust
                    </span>
                </div>
            </div>
            <div class="col-12 col-lg-5 col-xl-4 order-first order-lg-last">
                <div class="signup-form">
                    <div class="form-steps">
                        <div class="form-steps__header">
                            <div class="form-steps__step-number">
                                step 1 of 3
                            </div>
                            <div class="form-steps__title">Select your plan</div>
                        </div>
                    </div>
                    <product-list :products="products" class="product-list" v-model="selectedProduct"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from 'api/dispatcher';
    import orderBy from 'lodash.orderby';
    import ProductList from 'components/product-list';

    export default {
        auth: false,
        layout:     'light-theme',
        data() {
            return {
                products:        [],
                selectedProduct: null,
            }
        },
        asyncData({error}) {
            return api.getProducts(false).then(response => {
                return {
                    products:        response.data,
                    selectedProduct: orderBy(response.data, ['price'], ['asc']).find(product => product.price > 0)
                }
            }).catch((e) => {
                error({statusCode: e.response.status})
            });
        },
        components: {
            ProductList
        },
        head() {
            return {
                title: 'Sign Up | Evil Distributor'
            }
        }
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";
    @import "../assets/scss/mixins/px-rem";

    .features {
        margin: 0 auto;
        padding-top: calculateRem(104px);
        max-width: calculateRem(450px);
        color: $white;
        @media (max-width: $xxl) {
            padding-top: calculateRem(70px);
        }
        @media (max-width: $sm) {
            padding-top: calculateRem(32px);
        }
        &-wr {
            min-height: calc(100vh - 48px); // 48px - header height
            display: flex;
            justify-content: space-around;
            background-color: #0e1318;
            @media (max-width: $xl) {
                min-height: auto;
            }
        }
        &__title {
            margin-bottom: calculateRem(80px);
            font-size: calculateRem(32px);
            letter-spacing: calculateRem(.2px);
            text-align: center;
            font-weight: $font-weight-normal;
            line-height: 1.2;
            @media (max-width: $md) {
                margin-bottom: calculateRem(32px);
                font-size: calculateRem(20px);
            }
            @media (max-width: $sm) {
                font-size: calculateRem(16px);
            }
        }
        &__list-wr {
            display: flex;
            @media (max-width: $sm) {
                flex-direction: column;
                align-items: center;
            }
        }
        &__list {
            padding: calculateRem(21px) calculateRem(25px);
            list-style: none;
            flex: 1 1 50%;
            @media (max-width: $sm) {
                max-width: calculateRem(224px);
                width: 100%;
            }
            li {
                font-size: calculateRem(12px);
                line-height: 2;
                letter-spacing: calculateRem(.3px);
                color: $light-grey;
                &::before {
                    margin-right: calculateRem(8px);
                    width: calculateRem(16px);
                    height: calculateRem(16px);
                    display: inline-block;
                    content: '';
                    background-size: contain;
                    background-repeat: no-repeat;
                    vertical-align: middle;
                }
            }
            &--dos {
                background-color: rgba($slate-grey, 0.2);
                li::before {
                    background-image: url('../assets/images/success.svg');
                }
            }
            &--donts {
                background-color: rgba($slate-grey, 0.1);
                li::before  {
                    background-image: url('../assets/images/error.svg');

                }
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
            font-size: calculateRem(12px);
            letter-spacing: calculateRem(.3px);
            background-color: $clear-blue;
            border-radius: calculateRem(4px);
            text-transform: uppercase;
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

    .product-list {
        border-radius: 4px;
        overflow: hidden;
        border: 1px solid $cool-grey;
        &__label {
            margin: 0;
            height: 100px;
            display: flex;
            align-items: center;
            background-color: $white;
            border-bottom: 1px solid $cool-grey;
            cursor: pointer;
            &:last-of-type {
                border-bottom: none;
            }

            @media (max-width: $lg) {
                height: 80px;
            }
            @media (max-width: $md) {
                height: 63px;
            }

        }
        &__radio {
            margin: 0 16px;
            width: 28px;
            height: 28px;
            flex: 0 0 auto;
            display: block;
            border: 1px solid $cool-grey;
            border-radius: 50%;
            background-color: $white;
            @media (max-width: $md) {
                width: 22px;
                height: 22px;
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
            flex: 0 0 100px;
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

    .signup-form {
        margin: 0 auto;
        padding: calculateRem(70px) 0;
        max-width: calculateRem(364px);
        @media (max-width: $xl) {
            padding: calculateRem(20px) 0 calculateRem(40px);
        }
    }

    .ea-customer-trust {
        margin-top: calculateRem(117px);
        text-align: center;
        display: block;
        font-size: calculateRem(12px);
        letter-spacing: calculateRem(.3px);
        color: $steel;
        @media (max-width: $xxl) {
            margin: calculateRem(70px) 0 calculateRem(48px);
        }
        @media (max-width: $sm) {
            margin: calculateRem(32px) 0;
        }
    }

    .ea-girl {
        max-width: 35%;
        @media (max-width: $xl) {
            display: none;
        }
    }
</style>