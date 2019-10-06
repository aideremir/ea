<template>
    <li class="col-6 col-sm-4 col-lg-3 col-xxl-2 content-item-person">

        <nuxt-link :to="link" class="content-item-person__image-wr">
            <img class="content-item-person__image" :src="src"
                 sizes="(max-width: 575px) 50vw, (max-width: 991px) 33vw, (max-width: 1400px) 25vw, (max-width: 1730px) 16vw, 252px"
                 :srcset="srcSet"
                 @error="imgUrlAlt = true"
                 :alt="item.name">
        </nuxt-link>

        <div class="content-item-person__info">
            <nuxt-link :to="link" class="content-item-person__name">
                {{ item.name }}
            </nuxt-link>
            <span v-if="item.upvotes" class="content-item-person__rating">
                {{ likes }}
            </span>
        </div>
    </li>
</template>

<script>
    const imageToShow = 1;

    export default {
        props:      {
            item: Object
        },
        data() {
            return {
                imgUrlAlt: false
            }
        },
        computed: {
            likes() {
                return `${this.item.upvotes} ${this.item.upvotes === 1 ? 'like' : 'likes'}`;
            },
            src() {
                if (this.imgUrlAlt) {
                    return 'https://via.placeholder.com/252x378/59606b/fffffff';
                }

                if (this.item.images && this.item.images[imageToShow]) {
                    return this.item.images[imageToShow][360];
                } else {
                    return '';
                }

            },
            srcSet() {
                if (this.imgUrlAlt) {
                    return '';
                }

                if (this.item.srcSet) {
                    return this.item.srcSet[imageToShow];
                }
            },
            link() {
                return this.item.contentType === 'Director' ? this.$routes.director(this.item) : this.$routes.performer(this.item);
            },
        }
    }
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .content-item-person {
        margin-bottom: 24px;
        &__image {
            width: 100%;
        }
        &__info {
            padding: .5rem 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        &__name {
            font-size: 0.9375rem;
            letter-spacing: .4px;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
        }
        &__rating {
            padding-left: 5px;
            font-size: 0.75rem;
            color: $light-grey;
            font-weight: $font-weight-light;
            white-space: nowrap;
        }
    }
</style>
