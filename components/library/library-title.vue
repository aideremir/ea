<template>
    <h1 class="library__title"><slot></slot></h1>
</template>

<script>
    export default {
        props: {
            title: String,
        }
    }
</script>

<style lang="scss">
    @import "../../assets/scss/variables";
    @import "../../assets/scss/mixins/px-rem";

    .library {
        &__title {
            margin: calculateRem(32px) 0 calculateRem(24px);
            font-size: calculateRem(24px);
            letter-spacing: calculateRem(.3px);
            font-weight: $font-weight-normal;
        }
    }

</style>