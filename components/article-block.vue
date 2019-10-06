<template>
    <div class="article">
        <h1>{{ title }}</h1>
        <div class="article__content">
            <slot/>
        </div>

    </div>
</template>

<script>

    export default {
        props: {
            title:      String
        },
    };
</script>

<style lang="scss">
    @import '../assets/scss/variables';
    @import '../assets/scss/mixins/px-rem';

    .article {
        margin: 0 auto;
        padding: calculateRem(40px) 0;
        max-width: calculateRem(820px);
        h1 {
            margin-bottom: calculateRem(40px);
            font-size: calculateRem(20px);
            letter-spacing: calculateRem(.2px);
            font-weight: $font-weight-normal;
        }
        &__content {
            letter-spacing: calculateRem(.4px);
            font-weight: $font-weight-light;
            font-size: calculateRem(15px);
            white-space: pre-wrap;
        }
    }

</style>
