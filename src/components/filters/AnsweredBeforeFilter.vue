<script setup lang="ts">
import type { SearchFilterOptions } from "@/composable/useSearchFilter";

const model = defineModel<SearchFilterOptions["filters"]["answeredBefore"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<label for="answeredBefore" aria-label="Answered Before">Answered Before</label>
		<DatePicker class="w-full" input-id="answeredBefore" v-model="model" placeholder="Answered Before" show-icon
			show-button-bar icon-display="input" />
	</div>
</template>

<style scoped></style>