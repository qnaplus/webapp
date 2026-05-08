<script setup lang="ts">
defineProps<{
	results: number;
}>();
</script>

<template>
	<div class="text-sm ml-auto">{{ results }} results</div>
</template>

<style scoped></style>
