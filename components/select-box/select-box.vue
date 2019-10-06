<template>
    <div class="select-box">
        <popper ref="popper" trigger="click" :options="{placement: 'bottom-start'}">
            <app-button slot="reference" class="browse__select" child-class="form-control form-control--small form-control-select">
                {{ currentLabel }}
            </app-button>

            <div class="popper popper--no-arrow popper--fluid">
                <div v-if="searchable" class="popper__head">
                    <input v-model="itemsFilter" @keyup="$emit('searchKeyUp', $event)" placeholder="Search" type="text"
                           class="form-control form-control--small">
                </div>
                <div class="popper__body popper__body--has-scroll">
                    <ul class="popper__list">
                        <li v-for="item in preparedItems" @click="selectItem(item)"
                            class="popper__list-item popper__list-item--nowrap"
                            :class="{'popper__list-item--disabled': item.isDisabled}">
                            {{ item.label }}
                        </li>
                    </ul>
                </div>
            </div>
        </popper>
    </div>
</template>

<script>
    import Popper from 'vue-popperjs';
    import AppButton from 'components/button';

    export default {
        components: {
            Popper,
            AppButton
        },
        props: {
            items: Array,
            value: [Number, String],
            itemLabelKey: {
                type: String,
                default: 'name'
            },
            itemValueKey: {
                type: String,
                default: 'value'
            },
            searchable: {
                type: Boolean,
                default: false
            },
            disabledValues: {
                type: Array,
                default: function () {
                    return [];
                }
            },
            defaultLabel: String,
            defaultValue: {
                default: null
            }
        },
        data() {
            return {
                itemsFilter: '',
            };
        },
        computed: {
            currentLabel() {
                const searchValue = this.value || this.defaultValue;
                const selectedItem = this.preparedItems.find(item => item.value === searchValue);

                if (selectedItem) {
                    return selectedItem.label;
                }
            },
            preparedItems() {
                const preparedItems = this.items.map(item => {
                    return {
                        label: item[this.itemLabelKey],
                        value: item[this.itemValueKey],
                        isDisabled: this.disabledValues.indexOf(item[this.itemValueKey]) !== -1
                    };
                });

                if (this.defaultLabel) {
                    preparedItems.unshift({
                        label: this.defaultLabel,
                        value: this.defaultValue,
                        isDisabled: false
                    });
                }

                return preparedItems;
            }
        },
        methods: {
            selectItem(item) {
                if (item.value === null) {
                    this.itemsFilter = '';
                }

                this.$emit('input', item.value);
                this.$refs['popper'].doClose();
            },
        }
    };
</script>

<style lang="scss">
    .select-box {
        position: relative;
    }
</style>
