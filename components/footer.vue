<template>
    <footer class="footer">
        <div class="container">
            <div class="row footer__inner">
                <div class="col-12 col-sm-10 col-centered col-lg footer__navigation">
                    <nav class="navigation">
                        <ul class="navigation__list">
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.home()" class="navigation__link">Home</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.browse()" class="navigation__link">Browse</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.performers()" class="navigation__link">Pornstars</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.directors()" class="navigation__link">Directors</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.tags()" class="navigation__link">Categories</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <a href="#" class="navigation__link">Sitemap</a>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.support()" class="navigation__link">Support</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <a href="#" class="navigation__link">Billing</a>
                            </li>
                            <li class="navigation__item">
                                <a href="#" class="navigation__link">Affiliate Program</a>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.terms()" class="navigation__link">Terms & Conditions</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.privacy()" class="navigation__link">Privacy Policy</nuxt-link>
                            </li>
                            <li class="navigation__item">
                                <nuxt-link :to="$routes.compliance()" class="navigation__link">Compliance Statement</nuxt-link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div class="col-12 col-sm-10 col-centered col-lg-5 footer__show-more-block">
                    <show-more-block title="What is Evil Angel?" extra-class="show-more-block--footer">
                        Welcome to the award winning Evil Angel website, home to the most
                        popular pornstars of today, yesterday and tomorrow, in their most
                        extreme and hardcore porn scenes to date. Evil Angel features almost
                        30 years of original gonzo porn, hard sex videos and anal porn like
                        you've never seen before, and have won countless AVN and XBiz awards
                        including 'Best Site' and 'Best Studio'. Inside you'll find award
                        winning videos like 2017's most outrageous sex scene with Holly
                        Hendrix and Adriana Chechik, in a threesome with Markus Dupree, as
                        they do everything from ass to mouth sucking, rimjobs, cum swapping
                        and hard sodomy. Also inside is Lana Rhoades' most extreme scene ever,
                        as she gets spanked, choked and blowbanged while she deepthroats and
                        slobbers on Bryan Gozzling's big dick, before having a squirting orgasm
                        and taking a huge facial. Also featured is the sex documentary 'I Am Katrina',
                        where Katrina Jade takes you into her private life as well as brings four
                        new hardcore scenes shot by top directors. Browse classic porn movies and
                        scenes going back to 1989! Join today and we'll have you cumming for
                        days on end with big titty MILFs and tight teens taking things to the
                        next level in the best quality porn you can find online.
                    </show-more-block>
                    <show-more-block title="Why Should I Join?" extra-class="show-more-block--footer">
                        Evil Angel has been producing quality, hardcore gonzo and anal porn since 1989,
                        and have featured the most famous porn stars and directors in the adult industry
                        and continues to lead the way in original content. The members' area will get
                        you access to almost 30 years of gaping anal porn, throat fucking & blowbangs,
                        creampies, squirting and gangbang porn. Watch some of your favorite all time
                        stars like Sasha Grey, Skin Diamond, Belladonna and Tori Black, as well as current
                        favorites like Lana Rhoades, Abella Danger, Adriana Chechik, Anikka Albrite,
                        Riley Reid, AJ Applegate and many more. Download unlimited gonzo porn videos
                        and full DVDs in perfect HD quality with daily updates. We also feature the
                        best directors in hardcore porn like Rocco Siffredi, Nacho Vidal, Mike Adriano,
                        Jonni Darkko, Jay Sin and more, directing movies that focus on anal sex, fetish
                        videos, Interracial, lesbian porn, transsexual content and anything else you can
                        think of. Browse through thousands of hi res picture sets of big booty Latinas,
                        experienced MILFs, amateur teens and ebony babes. Watch classic and vintage porn
                        movies as well as brand new updates, every day of the week! Don't wait any longer,
                        join today and take full advantage of the huge members' area!
                    </show-more-block>
                </div>
                <div class="col-12 col-sm-10 col-centered col-lg footer__benefits">
                    <member-benefits></member-benefits>
                </div>

                <div class="evilangel-info col-12 col-sm-10 col-lg-12 col-centered">
                    <img class="evilangel-info__image" src="../assets/images/logo.svg" alt="">
                    <div class="evilangel-info__since">
                        EVIL ANGEL® KEEPING IT HARD SINCE 1989
                    </div>
                    <div class="evilangel-info__text">© EA Internet 2018. All Rights Reserved Worldwide.
                        Records required by 18 USC 2257 and 28 CFR 75 are maintained
                        by J. Stagliano, Custodian of Records, 14141 Covello St. Unit 8C,
                        Van Nuys, CA 91405 USA.</div>
                </div>
            </div>
            <div class="row footer__billing">
                <div class="col">
                    <div class="footer__billing-text">
                        For billing inquiries or to cancel your membership, please visit <a href="https://www.truepay.io/" target="_blank"><truepay-icon class="footer__billing-image" /></a> our authorized sales agent.
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>

    import ShowMoreBlock from 'components/show-more-block';
    import MemberBenefits from 'components/member-benefits';
    import TruepayIcon from '../assets/images/inline/logo-truepay.svg';

    export default {
        components: {
            ShowMoreBlock,
            MemberBenefits,
            TruepayIcon
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .footer {
        &__inner {
            border-top: $border-top-width solid $border-top-color;
            padding-top: calculateRem(44px);
            padding-bottom: calculateRem(34px);
            @media (max-width: $lg) {
                padding-bottom: calculateRem(64px);
            }
        }
        &__navigation {
            @media (max-width: $lg) {
                margin-bottom: 3rem;
            }
        }
        .navigation {
            &__list {
                padding: 0;
                max-width: calculateRem(260px);
                columns: 2;
                list-style: none;
                column-gap: 0;
                @media (max-width: $lg) {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    max-width: none;
                }
                @media (max-width: $sm) {
                    flex-direction: column;
                    align-items: center;
                }
            }
            &__item {
                margin-bottom: .5rem;
                @media (max-width: $lg) {
                    margin: 0 .5rem .5rem;
                }
            }
            &__link {
                font-size: .9375rem;
                line-height: 1.2;
                letter-spacing: calculateRem(.4px);
                white-space: nowrap;
            }
        }
        &__billing {
            padding: calculateRem(30px) 0 calculateRem(40px);
            border-top: 1px solid $charcoal-grey;
            @media (max-width: $lg) {
                padding: calculateRem(30px) 0;
            }
            &-image {
                margin: 0 calculateRem(5px);
            }
            &-text {
                font-size: calculateRem(12px);
                line-height: 1.33;
                letter-spacing: calculateRem(.3px);
                color: $cool-grey;
                @media (max-width: $lg) {
                    text-align: center;
                }
            }
        }
    }

    .evilangel-info {
        @media (max-width: $lg) {
            text-align: center;
        }
        &__image {
            width: calculateRem(120px);
        }
        &__since {
            margin: calculateRem(17px) 0 calculateRem(16px);
            line-height: 1.33;
            letter-spacing: calculateRem(.4px);
            font-size: 0.75rem;
            color: $light-grey;
        }
        &__text {
            margin: auto;
            max-width: calculateRem(396px);
            color: $cool-grey;
            line-height: 1.33;
            font-size: 0.75rem;
            letter-spacing: calculateRem(.4px);
            font-weight: $font-weight-light;
            white-space: pre-line;

        }
    }

    @supports (display: grid) {
        .footer {
            &__inner {
                display: grid;
                grid-template-columns: 30% 40% 30%;
                grid-gap: 10px;
                @media (max-width: $lg) {
                    display: flex;
                }
            }
            &__navigation {
                grid-row: 1;
                grid-column: 1;
            }
            &__show-more-block {
                max-width: 100%;
                grid-row: 1 / 5;
                grid-column: 2;
            }
            &__benefits {
                grid-row: 1 / 3;
                grid-column: 3;
            }
        }
    }
</style>
