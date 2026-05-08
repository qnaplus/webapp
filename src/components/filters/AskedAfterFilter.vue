<script setup lang="ts">
import type { SearchFilterOptions } from "@/composable/useSearchFilter";

const model = defineModel<SearchFilterOptions["filters"]["askedAfter"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<label for="askedAfter">Asked After</label>
		<DatePicker class="w-full" input-id="askedAfter" v-model="model" placeholder="Asked After"
			show-icon show-button-bar icon-display="input" />
	</div>
</template>

<style scoped></style>