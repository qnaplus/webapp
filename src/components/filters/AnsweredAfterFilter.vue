<script setup lang="ts">
import type { SearchFilterOptions } from "@/composable/useSearchFilter";

const model = defineModel<SearchFilterOptions["filters"]["answeredAfter"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<label for="answeredAfter" aria-label="Answered After">Answered After</label>
		<DatePicker class="w-full" input-id="answeredAfter" v-model="model" placeholder="Answered After"
			show-icon fluid show-button-bar icon-display="input" />
	</div>
</template>

<style scoped></style>