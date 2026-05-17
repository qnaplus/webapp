<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { renderQuestion } from "../../rendering";
import QuestionDetails from "../shared/QuestionDetails.vue";
import QuestionTags from "../shared/QuestionTags.vue";

const question = defineProps<Question>();
const { questionContent, answerContent } = renderQuestion(question, {
	limit: 75,
});
defineEmits<{
	"read-more": [question: Question];
}>();
</script>

<template>
    <!-- TODO:
        make the webkit-mask work with light mode theming
    -->
    <Card :pt="{
        content: {
            class: 'max-h-48 overflow-hidden text-muted-color break-words',
            style: '-webkit-mask-image: -webkit-gradient(linear, left 70%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))'
        }
    }" class="prose prose-invert prose-zinc max-w-none border-1 border-[var(--p-content-border-color)] mb-3">
        <template #title>
            <span class="text-base font-medium">{{ title }}</span>
        </template>
        <template #subtitle>
            <question-details :question="question" />
        </template>
        <template #content>
            <div class="flex flex-col gap-2">
                <div>
                    <component :is="component.node" v-bind="component.props" v-for="component in questionContent" />
                </div>
                <div v-if="answered">
                    <span class="font-medium">Answer</span>
                    <component :is="component.node" v-bind="component.props" v-for="component in answerContent" />
                </div>
            </div>
        </template>
        <template #footer>
            <Button @click="$emit('read-more', question)" label="Read More" severity="secondary" variant="outlined" size="small" />
            <Divider />
            <QuestionTags :tags="question.tags" :program="question.program" />
        </template>
    </Card>
</template>
