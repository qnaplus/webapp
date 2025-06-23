<script setup lang="ts">
import { renderQuestion } from "../../rendering";
import QuestionDetails from "../shared/QuestionDetails.vue";
import QuestionTags from "../shared/QuestionTags.vue";
import { bookmarkQuestion, type EnhancedQuestion } from "../../database";

const { question } = defineProps<{
    question: EnhancedQuestion;
}>();
const { questionContent, answerContent } = renderQuestion(question, {
    limit: 75,
});
defineEmits<{
	"read-more": [question: EnhancedQuestion];
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
    }" class="prose prose-invert prose-slate max-w-none !bg-surface-900 border-1 border-surface-800 mb-3 !rounded-md">
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
            <div class="flex flex-row justify-between">
                <QuestionTags :tags="question.tags" :program="question.program" />
                <Button class="card-btn" @click="bookmarkQuestion(question)" v-tooltip.left="'Bookmark Question'"
                    :icon="question.bookmarked ? 'pi pi-bookmark-fill' : 'pi pi-bookmark'" aria-label="Settings" text />
            </div>
        </template>
    </Card>
</template>

<style>
.border-1 {
    border-width: 1px;
}

.card-btn {
    width: 32px !important;
    height: 32px !important;
}
</style>
