<template>
    <div class="details" :class="{'details--table': type === 'table'}">
        <slot></slot>
    </div>
</template>

<script>

    import LinkList from 'components/link-list';

    export default {
        props: {
            item: Object,
            type: String
        },
        components: {
            LinkList
        }
    };

</script>

<style lang="scss">
    @import '../assets/scss/variables';

    .details {
        font-size: .9375rem;
        &__row {
            font-size: .9375rem;
            font-weight: $font-weight-light;
            letter-spacing: .4px;
            color: $white;
        }
        &__cell {
            &:first-of-type {
                color: $light-grey;
            }
        }
    }

    .details--table {
        display: table;
        @media (max-width: $md) {
            display: block;
        }
        .details__row {
            display: table-row;
            @media (max-width: $md) {
                display: block;
            }
        }
        .details__cell {
            display: table-cell;
            line-height: 1.5;
            @media (max-width: $md) {
                display: block;
                padding-bottom: .3rem;
            }
            &:first-of-type {
                padding-right: 1.25rem;
            }
        }
    }
</style>
