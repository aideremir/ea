<template>
    <div class="control-page">
        <div class="container">
            <div class="row control-page__row">
                    <div class="col control-page__col control-page__col--image">
                        <img class="control-page__image" src="https://via.placeholder.com/396x716" alt="">
                    </div>
                    <div class="col control-page__col control-page__col--info">
                        <img src="../assets/images/logo.svg" alt="">
                        <div class="control-page__text">
                            The following website, including all webpages, links, images and videos,
                            display sexually explicit material. Only consenting adults are authorized
                            beyond this page. If you are a minor (under the age of 18 years old or 21
                            years old where 18 isn't the legal age of majority), if sexually explicit
                            material offends you or if it's illegal to view such material in your
                            community, you MUST leave by clicking EXIT below. By clicking ENTER, you
                            agree to the statement at the bottom of the page.
                        </div>
                        <div class="control-page__buttons">
                            <a class="btn btn--lg btn--block btn--secondary">
                                Enter
                            </a>
                            <a class="btn btn--lg btn--block btn--tertiary">
                                Exit
                            </a>
                        </div>
                        <div class="control-page__text control-page__text--secondary">By entering this site you agree that:
                            You are an adult in your community and are at least 18 years old (21 in some communities);
                            You will not expose minors to the sexually explicit content you are about to view;
                            You believe that sexually explicit material is not offensive or obscene;
                            Sexually explicit material is not deemed to be obscene or illegal in your community and you wish to view such material;
                            You will use the material available on this website for your own personal use and will not sell, distribute, give or make available the content on this website to anyone. You will take the appropriate steps in order to make sure no minor is able to view the content available on this site;
                            You have read this agreement, understood it and agree to be bound by it.

                            If minors have access to your computer, please restrain their access to sexually explicit material by using any of the following products:
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        auth: false,
        head() {
            return {
                title: 'Control Page | Evil Distributor'
            }
        }
    }
</script>

<style lang="scss">

    @import "../assets/scss/variables";
    @import "../assets/scss/mixins/px-rem";

    .control-page {
        padding: calculateRem(80px) 0 calculateRem(40px);
        @media (max-width: $lg) {
            padding: calculateRem(50px) 0 calculateRem(30px);
        }
        &__row {
            display: flex;
            justify-content: center;
        }
        &__col {
            padding: 0 12px;
            max-width: calculateRem(396px);
            &--image {
                @media (max-width: $lg) {
                    display: none;
                }
            }
        }
        &__text {
            margin: calculateRem(32px) 0;
            font-weight: $font-weight-light;
            letter-spacing: calculateRem(.4px);
            font-size: calculateRem(15px);
            &--secondary {
                margin: calculateRem(24px) 0 calculateRem(16px);
                font-size: calculateRem(12px);
                white-space: pre-line;
            }
        }
    }
</style>