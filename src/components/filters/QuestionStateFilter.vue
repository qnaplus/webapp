<script setup lang="ts">
import {
	type SearchFilterOptions,
	questionStateOptions,
} from "@/composable/useSearchFilter";

const model = defineModel<SearchFilterOptions["filters"]["state"]>({
	required: true,
});
</script>

<template>
	<div class="m-0">
		<SelectButton class="select-button-flex" :allow-empty="false" v-model="model" :options="questionStateOptions"
			option-label="name" aria-labelledby="multiple" />
	</div>
</template>

<style scoped>
.select-button-flex {
	display: flex;
}
</style>