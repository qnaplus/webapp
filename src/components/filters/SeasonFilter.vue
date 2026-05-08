<script setup lang="ts">
import type { SearchFilterOptions } from "@/composable/useSearchFilter";

defineProps<{
	options: SearchFilterOptions["seasons"];
}>();

const model = defineModel<SearchFilterOptions["filters"]["season"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<label for="season">Season</label>
		<MultiSelect class="w-full" input-id="season" v-model="model" placeholder="Season"
			:options="options" option-label="name" />
	</div>
</template>

<style scoped></style>