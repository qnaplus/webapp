<script setup lang="ts">
const query = defineModel<string>();
</script>

<template>
    <UInput
        v-model="query"
        type="search"
        class="w-full"
        :ui="{ root: 'w-full' }"
        icon="i-lucide-search"
        placeholder="Search"
        aria-label="Search Query"
    />
</template>
