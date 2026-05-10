<script setup lang="ts">
import Header from "@/components/shared/HeaderBar.vue";

withDefaults(defineProps<{ showHeader?: boolean }>(), { showHeader: true });
</script>

<template>
	<div class="app-root" id="app-root">
		<Header v-if="showHeader" />
		<div class="content">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped>
.app-root {
	display: flex;
	flex-direction: column;
	min-height: 100dvh;
}

.content {
	flex: 1;
	min-height: 0;
	overflow: hidden;
}
</style>
