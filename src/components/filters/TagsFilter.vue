<script setup lang="ts">
import { getTagSuggestions } from "@/composable/useSearch";
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";
import { ref } from "vue";

const model = defineModel<string[]>({ required: true });

const tagSuggestions = ref<string[]>([]);

const updateTagSuggestions = (event: AutoCompleteCompleteEvent) => {
	tagSuggestions.value = getTagSuggestions(event.query);
};
</script>

<template>
	<div class="m-0">
		<label for="tags">Tags</label>
		<InputGroup>
			<InputGroupAddon>
				<i class="pi pi-tags" aria-label="Tags" />
			</InputGroupAddon>
			<AutoComplete class="autocomplete-group" multiple input-id="tags" v-model="model"
				aria-label="Tags" @complete="updateTagSuggestions" :suggestions="tagSuggestions"
				placeholder="Tags" />
		</InputGroup>
	</div>
</template>

<style scoped></style>