<script setup lang="ts">
import type { SearchFilterOptions } from "@/composable/useSearchFilter";

const model = defineModel<SearchFilterOptions["filters"]["askedBefore"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<label for="askedBefore">Asked Before</label>
		<DatePicker class="w-full" input-id="askedBefore" v-model="model" placeholder="Asked Before"
			show-icon show-button-bar icon-display="input" />
	</div>
</template>

<style scoped></style>