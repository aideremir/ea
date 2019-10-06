<template>
    <div class="item__video-wr">
        <div ref="player" class="j-flowplayer is-splash">
            <div class="overlay overlay-sign-up" :class="{'overlay--visible': signupOverlayVisible}">
                <div class="overlay-container">
                    <!--<img src="../assets/images/tt-free-trailer-views-limit-exceeded.svg" alt="">-->
                    <!--<p>{{ $t('common.views_limit_exceeded') }}</p>-->
                    <!--<nuxt-link :to="$routes.signup()">{{ $t('header.get_free_access') }}</nuxt-link>-->
                </div>
            </div>
            <!--<div v-if="isAgeValidationRequired"-->
                 <!--class="overlay-age-validate"-->
                 <!--@click="validateAge">-->
            <!--</div>-->
            <!--<div v-if="finalBanner" class="overlay overlay-watch-full-episode">-->
                <!--<div class="overlay-container">-->
                    <!--&lt;!&ndash;<img src="../assets/images/tt-watch-the-full-episode.svg" alt="">&ndash;&gt;-->
                    <!--<nuxt-link :to="finalBanner.url">{{ finalBanner.buttonText }}</nuxt-link>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<script>
    import browserCookie from 'js-cookie';

    const MAX_PROMO_VIEWS = 5;
    const PROMO_VIEWS_COOKIE_NAME = 'ea_limit_promo_views';

    export default {
        props:   {
            scene:                   Object,
            limitPromoViews:         Boolean,
            isTrailerInitial:        Boolean,
            // finalBanner:             {},
            // isAgeValidationRequired: Boolean
        },
        data() {
            return {
                isTrailer:            true,
                api:                  null,
                signupOverlayVisible: false,
                currentViews:         0
            };
        },
        mounted() {
            let flowplayer = require('flowplayer-commercial/flowplayer.min.js');
            require('flowplayer-thumbnails')(flowplayer);
            // require('flowplayer-speed-menu')(flowplayer);
            // require('flowplayer-dashjs')(flowplayer);
            // require('flowplayer-hlsjs')(flowplayer);

            this.currentViews = +(browserCookie.get(PROMO_VIEWS_COOKIE_NAME)) || 0;
            this.api = flowplayer(this.$refs.player, this.getFlowplayerConfig());

            if (this.isLimitReached()) {
                return;
            }

            this.setupPromoViewsLimit();

            this.setupSplash();
            this.addFullScreenButton();
            this.addCinemaModeButton();
            this.addLeftPreviewsLabel();
            this.styleQualityButton();
        },
        created() {
            this.isTrailer = this.isTrailerInitial;
        },
        beforeDestroy() {
            this.api.shutdown();
        },
        computed: {
            previewsLeft() {
                return (MAX_PROMO_VIEWS - this.currentViews);
            }
        },
        methods: {
            setupPromoViewsLimit() {
                if (this.limitPromoViews) {
                    this.api.on('ready', function limitPromoViewsCb() {
                        this.currentViews++;

                        browserCookie.set(PROMO_VIEWS_COOKIE_NAME, this.currentViews, {expires: 365});
                    }.bind(this));
                }
            },
            isLimitReached() {
                if (this.limitPromoViews && this.currentViews >= MAX_PROMO_VIEWS) {
                    this.api.disable(true);
                    this.signupOverlayVisible = true;

                    return true;
                }
                return false;
            },
            setupSplash() {
                const primaryImage = this.$store.getters['auth/isSoftImagesMode'] ? 'soft' : this.scene.primaryImage;
                document.getElementById('player-inline-style').textContent = getSplashStyle(this.scene, primaryImage);
            },
            addFullScreenButton() {
                let fullscreenButton = this.$el.querySelector('.fp-fullscreen');
                fullscreenButton.parentNode.removeChild(fullscreenButton);

                fullscreenButton = document.createElement('a');
                fullscreenButton.className += 'fp-fullscreen fp-icon';
                this.$el.querySelector('.fp-controls').appendChild(fullscreenButton);
            },
            addCinemaModeButton() {
                let cinemaModeButton = document.createElement('a');
                cinemaModeButton.className += 'fp-cinema-mode fp-icon';

                this.$el.querySelector('.fp-controls').appendChild(cinemaModeButton);

                cinemaModeButton.addEventListener('click', () => {
                    this.$emit('cinema-mode-toggle')
                });
            },
            addLeftPreviewsLabel() {
                if (!this.limitPromoViews) {
                    return
                }

                let leftPreviewsLabel = document.createElement('span');
                let leftPreviewsMessage = this.previewsLeft === 1 ? `${this.previewsLeft} preview left` : `${this.previewsLeft} previews left`;

                leftPreviewsLabel.className += 'fp-left-previews';
                leftPreviewsLabel.innerHTML += leftPreviewsMessage;

                this.$el.querySelector('.fp-ui').appendChild(leftPreviewsLabel);
            },
            styleQualityButton() {
                this.api.on('ready', function styleQualityButtonCb() {
                    const qualitySelector = this.$el.querySelector('.fp-qsel');
                    if (qualitySelector) {
                        qualitySelector.innerHTML = '';
                    }
                }.bind(this));
            },
            getFlowplayerConfig() {
                return {
                    aspectRatio: '16:9',
                    autoplay:    false,
                    key: this.$appConfig.FLOWPLAYER.key,
                    // analytics:   this.$appConfig.GA_ID, // probably not needed as tracked in Snowplow
                    share:       false,
                    hlsjs:       {
                        startLevel: 'auto'
                    },
                    clip:        this.getClip()
                };
            },
            getClip() {
                return {
                    quality:    true,
                    sources:    this.getSources(),
                    thumbnails: {
                        height:      99,
                        interval:    5,
                        time_format: function (t) {
                            let padding = '0000';
                            return padding.substring(0, padding.length - t.toString().length) + t;
                        },
                        template:    this.getTemplate(),
                        preload:     false
                    }
                };
            },
            getSources() {
                if (this.isTrailer) {
                    let sources = [
                        {
                            'type': 'video/webm',
                            'src':  this.scene.trailer.webm[720]
                        },
                        {
                            'type': 'video/mp4',
                            'src':  this.scene.trailer.mp4[720]
                        }
                    ];

                    // todo add adaptive

                    return sources;
                } else {
                    let sources = [
                        {
                            'type': 'video/webm',
                            'src':  this.scene.video.webm[720]
                        },
                        {
                            'type': 'video/mp4',
                            'src':  this.scene.video.mp4[720]
                        }
                    ];

                    if (this.$route.query.adaptive) {
                        sources = [
                            {
                                'type': 'application/dash+xml',
                                'src':  this.scene.video.dash
                            },
                            {
                                'type': 'application/x-mpegurl',
                                'src':  this.scene.video.hls
                            }
                        ].concat(sources);
                    }

                    return sources;
                }
            },
            getTemplate() {
                return this.isTrailer ? this.scene.trailer.screengrabsPattern : this.scene.video.screengrabsPattern;
            },
            play(isTrailer) {
                if (this.isLimitReached()) {
                    return;
                }

                this.api.currentSpeed = 1;
                this.isTrailer = isTrailer;
                this.api.load(this.getClip());
            },
            // validateAge() {
            //     this.$emit('validate-age');
            // }
        }
    };

    function getSplashStyle(scene, primaryImage) {
        return `
            .is-splash {
                background-image: url(${scene.images[primaryImage][360]});
            }

            @media screen and (min-width: 360px) {
                .is-splash {
                    background-image: url(${scene.images[primaryImage][720]});
                }
            }

            @media screen and (min-width: 720px) {
                .is-splash {
                    background-image: url(${scene.images[primaryImage][1000]});
                }
            }

            @media screen and (min-width: 1000px) {
                .is-splash {
                    background-image: url(${scene.images[primaryImage][1300]});
                }
            }

            @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (   min--moz-device-pixel-ratio: 2), only screen and (     -o-min-device-pixel-ratio: 2/1), only screen and (        min-device-pixel-ratio: 2), only screen and (                min-resolution: 192dpi), only screen and (                min-resolution: 2dppx) {
                .is-splash {
                    background-image: url(${scene.images[primaryImage][720]});
                }
            }

            @media only screen and (-webkit-min-device-pixel-ratio: 2)      and (min-width: 520px), only screen and (   min--moz-device-pixel-ratio: 2)      and (min-width: 520px), only screen and (     -o-min-device-pixel-ratio: 2/1)    and (min-width: 520px), only screen and (        min-device-pixel-ratio: 2)      and (min-width: 520px), only screen and (                min-resolution: 192dpi) and (min-width: 520px), only screen and (                min-resolution: 2dppx)  and (min-width: 520px) {
                .is-splash {
                    background-image: url(${scene.images[primaryImage][1000]});
                }
            }

            @media only screen and (-webkit-min-device-pixel-ratio: 2)      and (min-width: 1200px), only screen and (   min--moz-device-pixel-ratio: 2)      and (min-width: 1200px), only screen and (     -o-min-device-pixel-ratio: 2/1)    and (min-width: 1200px), only screen and (        min-device-pixel-ratio: 2)      and (min-width: 1200px), only screen and (                min-resolution: 192dpi) and (min-width: 1200px), only screen and (                min-resolution: 2dppx)  and (min-width: 1200px) {
                .is-splash {
                    background-image: url(${scene.images[primaryImage][2600]});
                }
            }
`;
    }
</script>

<style lang="scss">
    @import "../assets/scss/flowplayer-default.css";
    @import "../assets/scss/flowplayer";

    .overlay-age-validate {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
    }
</style>
