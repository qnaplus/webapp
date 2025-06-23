<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { WindowVirtualizer } from "virtua/vue";
import type { UseSearchResult } from "../../composable/useSearch";
import { QuestionAdditionsMap } from "../../database";
import QuestionCard from "./QuestionCard.vue";

const {additions} = defineProps<{
    questions: UseSearchResult[];
    additions: QuestionAdditionsMap | undefined;
    query: string;
}>();
defineEmits<{
    "read-more": [question: Question];
}>();
</script>

<template>
    <WindowVirtualizer :data="questions" #default="{ item: question }">
        <QuestionCard @read-more="(q) => $emit('read-more', q)" :key="`${question.id}-${query}-${additions}`" :question="question"
            :additions="additions?.[question.id]" />
    </WindowVirtualizer>
</template>

<style scoped></style>
