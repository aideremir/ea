<template>
   <li class="accordion-item">
      <span class="accordion-item__title" @click="expanded = !expanded">
         {{ item.title }}
      </span>
      <div ref="item" class="accordion-item__content" :style="{maxHeight: itemHeight}">
         <p>
            {{ item.content }}
         </p>
      </div>
   </li>
</template>

<script>

    export default {
        props: {
            item: Object
        },
        data() {
            return {
                expanded: false
            }
        },
        computed: {
            itemHeight() {
                if (this.expanded) {
                    return this.$refs.item.scrollHeight + 'px';
                }

                return 0;
            }
        }
    };
</script>

<style lang="scss">
    @import '~assets/scss/variables';

   .accordion-item {
      padding-bottom: 3px;
      font-size: .9375rem;
      border-bottom: 1px solid $ice-blue;
      &__title {
         padding: 1rem 0;
         display: block;
         letter-spacing: .3px;
         position: relative;
         &::after {
            margin-right: 1rem;
            content: '';
            width: .8rem;
            height: .75rem;
            position: absolute;
            right: 0;
            background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCI+ICAgIDxkZWZzPiAgICAgICAgPHBhdGggaWQ9ImEiIGQ9Ik05LjQxNCAxMy44MjhMOCAxMi40MTRsNS43MDctNS43MDdhMSAxIDAgMSAxIDEuNDE0IDEuNDE0bC00LjI5MyA0LjI5MyA0LjI5MyA0LjI5M2ExIDEgMCAxIDEtMS40MTQgMS40MTRsLTQuMjkzLTQuMjkzeiIvPiAgICA8L2RlZnM+ICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+ICAgICAgICA8cGF0aCBkPSJNMCAwaDI0djI0SDB6Ii8+ICAgICAgICA8bWFzayBpZD0iYiIgZmlsbD0iI2ZmZiI+ICAgICAgICAgICAgPHVzZSB4bGluazpocmVmPSIjYSIvPiAgICAgICAgPC9tYXNrPiAgICAgICAgPHVzZSBmaWxsPSIjYTliMmJkIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHRyYW5zZm9ybT0ibWF0cml4KDAgMSAxIDAgLS41IC41KSIgeGxpbms6aHJlZj0iI2EiLz4gICAgICAgIDxnIGZpbGw9IiNhOWIyYmQiIG1hc2s9InVybCgjYikiPiAgICAgICAgICAgIDxwYXRoIGQ9Ik0wIDBoMjR2MjRIMHoiLz4gICAgICAgIDwvZz4gICAgPC9nPjwvc3ZnPg==);
         }
      }
      &__content {
         display: block;
         letter-spacing: .4px;
         font-weight: $font-weight-light;
         max-height: 0;
         overflow: hidden;
         transition: .5s;
         p {
            margin: 0;
            padding-bottom: 13px;
         }
      }
   }
</style>
