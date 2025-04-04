<script setup lang="ts">
import Tag from "primevue/tag";
import { capitalize } from "vue";

const { program } = defineProps<{ program: string }>();
</script>

<template>
    <Tag :class="program.toLowerCase()">{{ capitalize(program) }}</Tag>
</template>

<style lang="scss">
.v5rc {
    background-color: color-mix(in srgb, #f84f4f, transparent 84%) !important;
    color: #f84f4f !important;
}

.vurc {
    background-color: color-mix(in srgb, #9571ca, transparent 84%) !important;
    color: #9571ca !important;
}

.viqrc {
    background-color: color-mix(in srgb, #4894f7, transparent 84%) !important;
    color: #4894f7 !important;
}

.judging {
    background-color: color-mix(in srgb, #f5ad42, transparent 84%) !important;
    color: #f5ad42 !important;
}
</style>