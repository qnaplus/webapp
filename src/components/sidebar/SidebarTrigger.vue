<script setup lang="ts">
import { useSidebar } from "@/composable/useSidebar";

const { toggleSidebar } = useSidebar();
</script>

<template>
	<Button
		variant="text"
		severity="secondary"
		icon="pi pi-align-justify"
		size="small"
		aria-label="Toggle sidebar"
		data-sidebar="trigger"
		@click="toggleSidebar"
	/>
</template>
