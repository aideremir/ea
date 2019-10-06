<template>
    <button tabindex="0" class="btn" @click="$emit('click')">
        <span :data-attr="dataAttribute" class="btn__content" :class="childClass">
            <slot />
        </span>
    </button>
    
</template>

<script>
    export default {
        props: {
            childClass: String,
            dataAttribute: Number,
        }

    };
</script>
