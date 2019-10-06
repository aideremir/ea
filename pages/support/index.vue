<template>

    <div class="container">
        <div class="row">
            <div class="col">
                <div class="support-page">

                    <h1 class="support-page__title">Evil Angel Support</h1>
                    <span class="support-page__text">Found a bug? Have an issue that needs attention? Contact us</span>

                    <app-button v-if="!showForm" @click.native="showForm = !showForm" child-class="btn--secondary btn--md">
                        contact support
                    </app-button>

                    <form v-if="showForm" class="support-page__form">
                        <div class="form-group">
                            <label for="email">Email</label>
                            <input type="email" id="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="subject">Subject</label>
                            <input type="text" id="subject" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email">Description</label>
                            <textarea class="form-control" rows="5"></textarea>
                        </div>
                        <div class="form-group">
                            <app-button child-class="btn--secondary btn--md support-page__submit">
                                contact support
                            </app-button>
                        </div>
                    </form>

                    <div class="support-page__faq">
                        <h2 class="support-page__title support-page__title--faq">Frequently Asked Questions</h2>
                        <accordion-list :items="accordionItems"></accordion-list>
                    </div>

                </div>
            </div>
        </div>
    </div>


</template>

<script>
    import AccordionList from 'components/accordion/accordion-list';
    import AppButton from 'components/button';

    export default {
        data() {
            return {
                showForm: false,
                accordionItems: [
                    {
                        id: 0,
                        title: 'Accordian label',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    },
                    {
                        id: 1,
                        title: 'Accordian label 1',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    },
                    {
                        id: 2,
                        title: 'Accordian label 2',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    },
                    {
                        id: 3,
                        title: 'Accordian label 3',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    },
                    {
                        id: 4,
                        title: 'Accordian label 4',
                        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                    },
                ]
            }
        },
        auth: false,
        components: {
            AccordionList,
            AppButton
        },
        layout:     'light-theme',
        head() {
            return {
                title: 'Support | Evil Angel'
            }
        }
    }
</script>

<style lang="scss">

    @import "~assets/scss/variables";

    .support-page {
        margin: 0 auto;
        padding: 1.5rem 0;
        max-width: 608px;
        &__title {
            margin: 1rem 0;
            font-weight: $font-weight-normal;
            font-size: 1.5rem;
            letter-spacing: .3px;
            &--faq {
                margin: 2.5rem 0;
            }
        }
        &__text {
            margin-bottom: 1.5rem;
            color: $slate-grey;
            letter-spacing: .4px;
            font-weight: $font-weight-light;
            font-size: .9375rem;
            display: block;
        }
        &__form {
            margin-top: 2rem;
        }
        .form-group {
            margin-bottom: .5rem;
        }
        &__submit {
            margin-top: 1rem;
        }
        &__faq {
            margin-top: 2rem;
            border-top: 2px solid $ice-blue ;
        }
    }


</style>
