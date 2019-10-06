<template>
    <div class="member-benefits-wr">
        <div class="member-benefits">
            <h3 class="member-benefits__title">
                Member Benefits
            </h3>
            <ul class="member-benefits__list">
                <li class="member-benefits__item">
                    Over 10,000 Scenes of Hardcore Porn!
                </li>
                <li class="member-benefits__item">
                    Unlimited Downloads of the Best Porn Online!
                </li>
                <li class="member-benefits__item">
                    Almost 30 Years of Content!
                </li>
                <li class="member-benefits__item">
                    Daily Updates!
                </li>
                <li class="member-benefits__item">
                    Exclusive Advance World Premier Releases!
                </li>
                <li class="member-benefits__item">
                    Teen Porn & MILF Videos!
                </li>
                <li class="member-benefits__item">
                    The Best Transsexual Porn!
                </li>
                <li class="member-benefits__item">
                    1080p HD Streaming & Downloads!
                </li>
                <li class="member-benefits__item">
                    Watch on Any Device!
                </li>
                <li class="member-benefits__item">
                    24 Hour Customer & Technical Support!
                </li>
            </ul>
        </div>
    </div>

</template>

<script>
    export default {
    }
</script>

<style lang="scss">
    @import "../assets/scss/variables";

    .member-benefits {
        margin-left: auto;
        font-size: .9375rem;;
        @media (max-width: $lg) {
            margin: 0 auto 3rem;
            text-align: center;
        }
        &-wr {
            margin-left: auto;
            display: flex;
        }
        &__title {
            margin-bottom: 10px;
            font-weight: $font-weight-normal;
            font-size: 1em;
            line-height: 1.2;
            letter-spacing: 0.4px;
        }
        &__list {
            padding-left: 0;
            list-style: none;
        }
        &__item {
            font-size: 1em;
            font-weight: $font-weight-light;
            color: $light-grey;;
            line-height: 1.6;
            &::before {
                content: '•';
            }
        }
    }

</style>