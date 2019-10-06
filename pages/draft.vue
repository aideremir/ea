<template>
<div>
    <div class="container">
        <div class="row">
            <div class="col-12 col-lg-4">
                <div class="form-steps">
                    <div class="form-steps__header">
                        <div class="form-steps__step-number">
                            step 1 of 3
                        </div>
                        <div class="form-steps__title">Select your plan</div>
                    </div>
                </div>
                <form action="" class="product-list">
                    <input id="product-1" name="product" type="radio" value="1" class="product-list__input">
                    <label for="product-1" class="product-list__label">
                        <span class="product-list__radio"></span>
                        <span class="product-list__info">
                            <span class="product-list__name">
                                Free Membership
                            </span>
                            <span class="product-list__description">
                                1 free scene + all trailers
                            </span>
                        </span>
                        <span class="product-list__price">
                            <span class="product-list__cost product-list__cost--free">
                                FREE
                            </span>
                        </span>
                    </label>
                    <input id="product-2" name="product" type="radio" value="2" class="product-list__input">
                    <label for="product-2" class="product-list__label">
                        <span class="product-list__radio"></span>
                        <span class="product-list__info">
                            <span class="product-list__name">
                                1 month full access
                            </span>
                            <span class="product-list__description">
                                $9.95/month
                            </span>
                        </span>
                        <span class="product-list__price product-list__price--most-popular">
                            <span class="product-list__cost" data-cents=".95">
                                <span class="product-list__currency">$</span>9
                            </span>
                        </span>
                    </label>
                    <input id="product-3" name="product" type="radio" value="2" class="product-list__input">
                    <label for="product-3" class="product-list__label">
                        <span class="product-list__radio"></span>
                        <span class="product-list__info">
                            <span class="product-list__name">
                                3 months full access
                            </span>
                            <span class="product-list__description">
                                $8.32/month
                            </span>
                        </span>
                        <span class="product-list__price">
                            <span class="product-list__cost" data-cents=".95">
                                <span class="product-list__currency">$</span>24
                            </span>
                        </span>
                    </label>
                    <input id="product-4" name="product" type="radio" value="2" class="product-list__input">
                    <label for="product-4" class="product-list__label">
                        <span class="product-list__radio"></span>
                        <span class="product-list__info">
                            <span class="product-list__name">
                                12 months full access
                            </span>
                            <span class="product-list__description">
                                $6.66/month
                            </span>
                        </span>
                        <span class="product-list__price">
                            <span class="product-list__cost" data-cents=".95">
                                <span class="product-list__currency">$</span>79
                            </span>
                        </span>
                    </label>
                </form>
            </div>
            <div class="col-12 col-lg-4">
                <div class="form-steps">
                    <div class="form-steps__header">
                        <div class="form-steps__step-number">
                            step 2 of 3
                        </div>
                        <div class="form-steps__title">Create your account</div>
                    </div>
                </div>
                <form action="">
                    <div class="form-group form-row">
                        <div class="col">
                            <label for="email">Email address</label>
                            <input type="text" id="email" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col">
                            <label for="password">Password</label>
                            <input id="password" type="password" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col">
                            <label for="password-repeat">Repeat Password</label>
                            <input type="password" id="password-repeat" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col-12">
                            <label>When were you born?</label>
                        </div>
                        <div class="col-3">
                            <select class="form-control">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <select class="form-control">
                                <option value="01">01</option>
                                <option value="02">02</option>
                                <option value="03">03</option>
                                <option value="04">04</option>
                                <option value="05">05</option>
                                <option value="06">06</option>
                                <option value="07">07</option>
                                <option value="08">08</option>
                                <option value="09">09</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <select class="form-control">
                                <option value="2018">2018</option>
                                <option value="2019">2019</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                            </select>
                        </div>
                    </div>
                    <div class="form-text">
                        <input type="checkbox">
                        I agree to the <button class="btn--link">Terms & Conditions</button> and <button class="btn--link">Privacy Policy</button> as well as agree to receive promotional emails (you may unsubscribe at any time).
                    </div>
                    <button class="btn btn--lg btn--block btn--secondary">CREATE ACCOUNT</button>
                </form>
            </div>
            <div class="col-12 col-lg-4">
                <div class="form-steps">
                    <div class="form-steps__header">
                        <div class="form-steps__step-number">
                            step 3 of 3
                        </div>
                        <div class="form-steps__title">Secure purchase</div>
                    </div>
                </div>
                <form>
                    <div class="form-group form-row">
                        <div class="col-6">
                            <label for="first-name">First name</label>
                            <input type="text" id="first-name" class="form-control">
                        </div>
                        <div class="col-6">
                            <label for="last-name">Last name</label>
                            <input type="text" id="last-name" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col">
                            <label for="card-number">Card number</label>
                            <input type="text" id="card-number" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col-7 form-row">
                            <div class="col-12">
                                <label for="expiration-date-month">Expiration date</label>
                            </div>
                            <div class="col">
                                <select id="expiration-date-month" class="form-control">
                                    <option value="01">01</option>
                                    <option value="02">02</option>
                                    <option value="03">03</option>
                                    <option value="04">04</option>
                                    <option value="05">05</option>
                                    <option value="06">06</option>
                                    <option value="07">07</option>
                                    <option value="08">08</option>
                                    <option value="09">09</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </div>
                            <div class="col">
                                <select id="expiration-date-year" class="form-control">
                                    <option value="2018">2018</option>
                                    <option value="2019">2019</option>
                                    <option value="2020">2020</option>
                                    <option value="2021">2021</option>
                                    <option value="2022">2022</option>
                                </select>
                            </div>
                        </div>
                        <div class="col">
                            <div class="col-10 offset-2">
                                <label for="ccv2">CCV2</label>
                                <input type="password" id="ccv2" class="form-control" maxlength="3">
                            </div>

                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col">
                            <label for="address">Address</label>
                            <input type="text" id="address" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col-6">
                            <label for="city">City</label>
                            <input type="text" id="city" class="form-control">
                        </div>
                        <div class="col-6">
                            <label for="state-province">State / Province</label>
                            <input type="text" id="state-province" class="form-control">
                        </div>
                    </div>
                    <div class="form-group form-row">
                        <div class="col-4">
                            <label for="zip-code">Zip</label>
                            <input type="text" id="zip-code" class="form-control">
                        </div>
                        <div class="col">
                            <label for="country">Country</label>
                            <input type="text" id="country" class="form-control">
                        </div>
                    </div>
                    <div class="form-text">
                        This charge will appear on your cardholder statement as ‘Truepay.com’. Truepay.com is the registered Payment Facilitator and Payment Processor for EA Internet, Inc (evilangel.com)
                    </div>
                    <button class="btn btn--lg btn--block btn--secondary">COMPLETE PURCHASE</button>

                </form>
            </div>
        </div>
    </div>
    <div class="features">
        <div class="container">
            <div class="row">
                <div class="col-8 col-centered">
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
                </div>
            </div>
        </div>
    </div>
</div>



</template>

<script>
    export default {
        auth: false,
        layout:     'light-theme',
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
        padding: 48px 20px;
        background-color: $body-bg;
        color: $white;
        &__title {
            margin-bottom: 32px;
            font-size: calculateRem(20px);
            letter-spacing: calculateRem(.2px);
            text-align: center;
            font-weight: $font-weight-normal;
            line-height: 1.2;
        }
        &__list-wr {
            display: flex;
        }
        &__list {
            padding: 21px 25px;
            list-style: none;
            flex: 1 1 50%;
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
            padding: 32px 0;
            display: flex;
            justify-content: center;
            align-content: center;
            @media (max-width: $md) {
                padding: 24px 0;
            }
        }
        &__step-number {
            margin-right: 8px;
            padding: 5.5px 10px;
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
</style>