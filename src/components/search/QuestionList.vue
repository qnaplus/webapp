<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { VList } from "virtua/vue";
import type { UseSearchResult } from "@/composable/useSearch";
import QuestionCard from "./QuestionCard.vue";

defineProps<{
	questions: UseSearchResult[];
	query: string;
}>();
defineEmits<{
	"read-more": [question: Question];
}>();
</script>

<template>
	<VList :data="questions" #default="{ item: question }">
		<QuestionCard @read-more="(q) => $emit('read-more', q)" :key="`${question.id}-${query}`" :question="question" />
	</VList>
</template>

<style scoped></style>
