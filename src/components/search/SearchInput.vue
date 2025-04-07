<script setup lang="ts">
const query = defineModel<string>();
</script>

<template>
    <IconField iconPosition="left">
        <InputIcon class="pi pi-search" />
        <InputText type="search" class="w-full" v-model:model-value="query" placeholder="Search"
            aria-label="Search Query" />
    </IconField>

</template>

<style scoped></style>
