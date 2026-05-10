<script setup lang="ts">
import QuestionDetails from "@/components/shared/QuestionDetails.vue";
import QuestionTags from "@/components/shared/QuestionTags.vue";
import { renderQuestion } from "@/rendering";
import type { Question } from "@qnaplus/scraper";

const props = defineProps<{ question: Question }>();
const { questionContent, answerContent } = renderQuestion(props.question, {
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
            class: 'max-h-48 overflow-hidden text-surface-300 break-words',
            style: '-webkit-mask-image: -webkit-gradient(linear, left 70%, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)))'
        }
    }" class="prose prose-invert prose-zinc max-w-none bg-surface-900! border border-surface-800 mb-3 rounded-md!">
        <template #title>
            {{ question.title }}
        </template>
        <template #subtitle>
            <question-details :question="question" />
        </template>
        <template #content>
            <div class="flex flex-col gap-2">
                <div>
                    <component :is="component.node" v-bind="component.props" v-for="component in questionContent" />
                </div>
                <div v-if="question.answered">
                    <span class="font-bold">Answer</span>
                    <component :is="component.node" v-bind="component.props" v-for="component in answerContent" />
                </div>
            </div>
        </template>
        <template #footer>
            <Button @click="$emit('read-more', question)" label="Read More" severity="secondary" />
            <Divider />
            <QuestionTags :tags="question.tags" :program="question.program" />
        </template>
    </Card>
</template>

<style>
.border-1 {
    border-width: 1px;
}
</style>
