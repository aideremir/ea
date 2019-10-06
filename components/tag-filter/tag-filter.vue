<template>
    <div>
        <div class="row">
            <div class="col-12">
                <div class="form-row">
                    <div class="col-12 browse__add-tag">
                        <label>Add categories</label>
                        <div class="form-check browse__filter-item browse__filter-item--show-tags">
                            <input class="form-check-input" type="checkbox" v-model="showAllTags" id="showAll">
                            <label class="form-check-label" for="showAll">
                                Show all
                            </label>
                        </div>
                    </div>
                </div>
                <div class="form-row" v-if="!showAllTags">
                    <div v-for="tagId in includedIds" class="col-12 col-lg-2">
                        <tag-select-box :value="tagId"
                                        @input="selectTag(tagId, $event)"
                                        :disabled-values="dropdownDisabledTagIds"/>
                    </div>
                    <div v-if="emptySelectBoxVisible" class="col-12 col-lg-2">
                        <tag-select-box @input="addTag"
                                        :disabled-values="dropdownDisabledTagIds"/>
                    </div>
                    <div class="col-12 col-lg-2">
                        <app-button @click="addTagDropdown" :disabled="!canAddDropdown" child-class="btn--sm btn--primary">
                            +
                        </app-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="showAllTags" class="row">
            <div class="col-12">
                <div class="tag-filter-wr">
                    <ul v-if="tags" class="tag-filter" :class="itemExtraClass">
                        <tag-filter-item v-for="tag in tags" :key="tag.id"
                                         :tag="tag"
                                         :is-included="isTagIncluded(tag.id)"
                                         :is-excluded="isTagExcluded(tag.id)"
                                         :is-disabled="isTagDisabled(tag.id)"
                                         @input="toggleTag(tag.id, $event)"/>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import TagFilterItem from './tag-filter-item';
    import TagSelectBox from 'components/select-box/tag-select-box';
    import AppButton from 'components/button';
    import flatMap from 'lodash.flatmap';
    import intersection from 'lodash.intersection';
    import difference from 'lodash.difference';

    export default {
        props: {
            itemExtraClass: {},
            includedIds: {
                type: Array,
                default: function () {
                    return [];
                },
            },
            excludedIds: {
                type: Array,
                default: function () {
                    return [];
                },
            },
            enabledIds: {
                type: Array,
                default: function () {
                    return [];
                },
            },
        },
        data() {
            return {
                showAllTags: false,
                emptySelectBoxVisible: this.includedIds.length === 0,
            };
        },
        computed: {
            tags() {
                return Object.values(this.$store.state.content.tagList).sort((a, b) => {
                    return (a.name > b.name) ? 1 : -1;
                });
            },
            allTagIds() {
                return Object.keys(this.$store.state.content.tagList).map(id => +id);
            },
            canAddDropdown() {
                return !this.emptySelectBoxVisible;
            },
            dropdownDisabledTagIds() {
                return [...this.includedIds, ...this.excludedIds, ...difference(this.allTagIds, this.allEnabledTagIds)];
            },
            allEnabledTagIds() {
                let result = this.allTagIds;

                if (this.enabledIds.length) {
                    result = intersection(result, this.enabledIds);
                }

                this.includedIds.forEach(includedTagId => {
                    const includedTag = this.$store.state.content.tagList[includedTagId];
                    result = intersection(result, flatMap(includedTag.relatedContentTags, tag => tag.id));
                    result.push(includedTagId);
                });

                this.excludedIds.forEach(excludedTagId => {
                    const excludedTag = this.$store.state.content.tagList[excludedTagId];
                    result = difference(result, flatMap(excludedTag.relatedContentTags, tag => tag.id));
                });

                return result;
            },
        },
        methods: {
            addToIncluded(tagId) {
                return [...this.includedIds, tagId];
            },
            removeFromIncluded(tagId) {
                const includedIds = this.includedIds.filter(id => id !== tagId);

                if (includedIds.length === 0) {
                    this.emptySelectBoxVisible = true;
                }

                return includedIds;
            },
            addToExcluded(tagId) {
                return [...this.excludedIds, tagId];
            },
            removeFromExcluded(tagId) {
                return this.excludedIds.filter(id => id !== tagId);
            },
            replaceInIncluded(oldTagId, newTagId) {
                let includedTagIds = [...this.includedIds];
                const oldTagIdIndex = includedTagIds.indexOf(oldTagId);
                includedTagIds[oldTagIdIndex] = newTagId;

                return includedTagIds;
            },
            addTag(tagId) {
                this.emptySelectBoxVisible = false;
                this.emitInput(this.addToIncluded(tagId), this.excludedIds);
            },
            toggleTag(tagId, tagState) {
                const includedTagIds = tagState.isIncluded ? this.addToIncluded(tagId) : this.removeFromIncluded(tagId);
                const excludedTagIds = tagState.isExcluded ? this.addToExcluded(tagId) : this.removeFromExcluded(tagId);

                this.emitInput(includedTagIds, excludedTagIds);
            },
            selectTag(oldTagId, newTagId) {
                if (newTagId === null) {
                    this.emitInput(this.removeFromIncluded(oldTagId), this.excludedIds);

                    return;
                }

                if (oldTagId) {
                    this.emitInput(this.replaceInIncluded(oldTagId, newTagId), this.excludedIds);

                    return;
                }

                if (!oldTagId) {
                    this.emitInput(this.addToIncluded(newTagId), this.excludedIds);
                }
            },
            emitInput(includedTagIds, excludedTagIds) {
                this.$emit('input', {
                    includedTagIds,
                    excludedTagIds,
                });
            },
            addTagDropdown() {
                this.emptySelectBoxVisible = true;
            },
            isTagIncluded(tagId) {
                return this.includedIds.indexOf(tagId) !== -1;
            },
            isTagExcluded(tagId) {
                return this.excludedIds.indexOf(tagId) !== -1;
            },
            isTagDisabled(tagId) {
                return this.allEnabledTagIds.indexOf(tagId) === -1;
            },
        },
        components: {
            TagFilterItem,
            TagSelectBox,
            AppButton
        },
    };
</script>

<style lang="scss">
    @import "~assets/scss/variables";

    .tag-filter {
        margin: 0 -8px;
        padding: 0;
        list-style: none;
        display: flex;
        flex-wrap: wrap;
    }

</style>
