<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { renderQuestion } from "../../rendering";
import QuestionDetails from "../shared/QuestionDetails.vue";
import QuestionTags from "../shared/QuestionTags.vue";

const question = defineProps<Question>();
const { questionContent, answerContent } = renderQuestion(question, {
	limit: 75,
});
const emit = defineEmits<{
	"read-more": [question: Question];
}>();

const onActivate = () => emit("read-more", question);
const onKeydown = (e: KeyboardEvent) => {
	if (e.key === "Enter" || e.key === " ") {
		e.preventDefault();
		onActivate();
	}
};
</script>

<template>
    <!-- TODO:
        make the webkit-mask work with light mode theming
    -->
    <UCard
        :title="title"
        variant="subtle"
        role="button"
        tabindex="0"
        :aria-label="`Read more: ${title}`"
        class="max-w-none border-1 border-[var(--ui-border)] mb-3 cursor-pointer transition-colors hover:bg-muted/30 ring-0"
        @click="onActivate"
        @keydown="onKeydown"
    >
        <template #header>
            <div class="flex flex-col gap-1">
                <span class="text-base font-medium">{{ title }}</span>
                <question-details :question="question" />
            </div>
        </template>
        <div class="masked-content max-h-48 overflow-hidden text-muted break-words">
            <div class="flex flex-col gap-2">
                <div>
                    <component :is="component.node" v-bind="component.props" v-for="component in questionContent" />
                </div>
                <div v-if="answered">
                    <span class="font-medium">Answer</span>
                    <component :is="component.node" v-bind="component.props" v-for="component in answerContent" />
                </div>
            </div>
        </div>
        <template #footer>
            <QuestionTags :tags="question.tags" :program="question.program" />
        </template>
    </UCard>
</template>

<style scoped>
.masked-content {
    -webkit-mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0) 100%);
}
</style>
