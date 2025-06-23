<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { WindowVirtualizer } from "virtua/vue";
import type { UseSearchResult } from "../../composable/useSearch";
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
    <WindowVirtualizer :data="questions" #default="{ item: question }">
        <QuestionCard @read-more="(q) => $emit('read-more', q)" :key="`${question.id}-${query}`" :id="question.id" :title="question.title" :question="question.question"
            :answered="question.answered" :author="question.author" :asked-timestamp-ms="question.askedTimestampMs"
            :program="question.program" :answered-timestamp-ms="question.answeredTimestampMs" :url="question.url"
            :tags="question.tags" :answer="question.answer" :asked-timestamp="question.askedTimestamp"
            :season="question.season" :answer-raw="question.answerRaw" :question-raw="question.questionRaw"
            :answered-timestamp="question.answeredTimestamp" />
    </WindowVirtualizer>
</template>

<style scoped></style>
