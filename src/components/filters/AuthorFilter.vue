<script setup lang="ts">
import { getAuthorSuggestions } from "@/composable/useSearch";
import type { SearchFilterOptions } from "@/composable/useSearchFilter";
import { ref } from "vue";

const model = defineModel<SearchFilterOptions["filters"]["author"]>({
	required: true,
});

const authorSuggestions = ref<string[]>([]);

const updateAuthorSuggestions = () => {
	authorSuggestions.value = getAuthorSuggestions(model.value);
};
</script>

<template>
	<div class="m-0">
		<label for="author">Author</label>
		<IconField>
			<InputIcon class="pi pi-user" />
			<AutoComplete input-id="author" class="w-full" input-class="w-full" v-model="model"
				@complete="updateAuthorSuggestions" :suggestions="authorSuggestions" placeholder="Author" />
		</IconField>
	</div>
</template>

<style scoped></style>