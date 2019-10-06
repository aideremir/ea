<template>
    <div class="rating" :class="{'rating--loading': isLoading}">
        <div class="rating__inner">
            <div v-if="currentVote === 1" class="rating__ico rating__ico--checked"></div>
            <app-button v-else @click.native="vote(1)" child-class="rating__ico"></app-button>

            <div class="rating__value">
                {{ upVotes }}
            </div>
        </div>

        <div class="rating__inner">
            <div v-if="currentVote === -1"
                 class="rating__ico rating__ico--down rating__ico--checked"></div>
            <app-button v-else @click.native="vote(-1)" child-class="rating__ico rating__ico--down"></app-button>

            <div class="rating__value">
                {{ downVotes }}
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import api from 'api/dispatcher';
    import AppButton from 'components/button';

    export default {
        props: {
            contentType: {
                type: String,
                required: true,
                validator: function (value) {
                    return ['Director', 'Performer', 'Scene', 'Movie'].indexOf(value) !== -1
                }
            },
            contentId: {
                type: Number,
                required: true
            },
            upVotes: {
                type: Number,
                required: true
            },
            downVotes: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                currentVote: null,
                isLoading: false
            };
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'auth/isLoggedIn',
                canVote: 'auth/canVote',
            }),
        },
        mounted() {
            if (!this.canVote || this.isLoading) {
                return;
            }

            this.isLoading = true;
            api.getMyVote(this.contentType, this.contentId)
                .then(response => {
                    this.currentVote = response.data.rating;
                    this.isLoading = false;
                })
                .catch(e => {
                    console.error(e);
                    this.isLoading = false;
                });
        },
        methods: {
            vote(vote) {
                if (!this.isLoggedIn) {
                    this.$store.dispatch('ui/showNotification', {
                        title: this.$t('ratings.auth_required'),
                        ttl: 4000
                    });
                    return;
                }

                if (!this.canVote) {
                    // this.$store.dispatch('ui/showModal', {
                    //     type:   'error',
                    //     title: this.$t('ratings.email_not_confirmed.title'),
                    //     body: this.$t('ratings.email_not_confirmed.body'),
                    //     footer: {
                    //         innerComponent: 'ea-resend-email-button'
                    //     }
                    // });
                    return;
                }

                const originalVote = this.currentVote;
                this.currentVote = vote;
                this.isLoading = true;

                api.vote(this.contentType, this.contentId, vote)
                    .then(() => this.isLoading = false)
                    .catch(() => {
                        this.currentVote = originalVote;
                        this.isLoading = false;
                    });
            }
        },
        components: {
            AppButton
        }
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .rating {
        display: flex;
        justify-items: center;
        align-items: center;
        &--loading {
            opacity: .3;
        }
        &__inner {
            margin: 0 calculateRem(3px);
            display: flex;
            align-items: center;
        }
        &__value {
            color: $white;
            letter-spacing: 0;
            font-size: calculateRem(14px);
        }
        &__ico {
            margin-right: calculateRem(4px);
            width: calculateRem(20px);
            height: calculateRem(22px);
            display: inline-block;
            cursor: pointer;
            background: transparent url(../assets/images/thumb.svg) no-repeat;
            background-size: contain;
            border: none;
            @media (max-width: $lg) {
                width: calculateRem(18px);
                height: calculateRem(19px);
            }
            &--disabled {
                cursor: default;
            }
            &--down {
                transform: scale(1, -1);
                top: 2px;
            }
            &--checked {
                background-image: url(../assets/images/thumb-red.svg)
            }
        }
    }

</style>
