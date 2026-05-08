<script setup lang="ts">
import type { SearchFilterOptions } from "@/composable/useSearchFilter";

defineProps<{
	options: SearchFilterOptions["programs"];
}>();

const model = defineModel<SearchFilterOptions["filters"]["program"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<label for="program">Program</label>
		<MultiSelect class="w-full" input-id="program" v-model="model" placeholder="Program"
			:options="options" option-label="name" />
	</div>
</template>

<style scoped></style>