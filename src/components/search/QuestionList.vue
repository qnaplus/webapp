<script setup lang="ts">
import { WindowVirtualizer } from "virtua/vue";
import type { UseSearchResult } from "../../composable/useSearch";
import QuestionCard from "./QuestionCard.vue";
import type { EnhancedQuestion } from "../../database";

defineProps<{
    questions: UseSearchResult[];
    query: string;
}>();
defineEmits<{
    "read-more": [question: EnhancedQuestion];
}>();
</script>

<template>
    <WindowVirtualizer :data="questions" #default="{ item: question }">
        <QuestionCard @read-more="(q) => $emit('read-more', q)" :key="`${question.id}-${query}`" :question="question" />
    </WindowVirtualizer>
</template>

<style scoped></style>
