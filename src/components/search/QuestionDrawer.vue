<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { computed, ref, watchEffect } from "vue";
import { renderQuestion } from "../../rendering";
import QuestionFooter from "../shared/QuestionFooter.vue";

const { question } = defineProps<{
	question: Question | undefined;
}>();

const visible = ref(false);
watchEffect(() => {
	visible.value = question !== undefined;
});

const content = computed(() => renderQuestion(question));

defineEmits(["hide-drawer"]);
</script>

<template>
    <UDrawer
        v-model:open="visible"
        direction="right"
        :handle="false"
        :ui="{ content: '!w-full md:!w-40 lg:!w-[40rem]' }"
        @update:open="(o: boolean) => !o && $emit('hide-drawer')"
    >
        <template #body>
            <div class="wrap-break-words max-w-none p-4" v-if="question !== undefined">
                <UAlert color="neutral" variant="subtle" icon="i-lucide-info">
                    <template #description>
                        qnaplus is an unofficial third-party application. <a :href="question.url" target="_blank">Visit the Q&A on RobotEvents</a> to get the most up-to-date information.
                    </template>
                </UAlert>
                <prose-h2 class="mb-1">{{ question.title }}</prose-h2>
                <question-details :question="question" />
                <USeparator class="my-4" />
                <div class="px-5 pb-3">
                    <prose-h3>Question</prose-h3>
                    <div class="text-surface-300">
                        <component :is="component.node" v-bind="component.props"
                            v-for="component in content.questionContent" />
                    </div>
                </div>
                <div v-if="question.answered" class="border bg-green-800/5 border-green-700/70 px-5">
                    <prose-h3>Answer</prose-h3>
                    <div class="text-surface-300">
                        <component :is="component.node" v-bind="component.props"
                            v-for="component in content.answerContent" />
                    </div>
                </div>
                <QuestionFooter :question="question" />
            </div>
        </template>
    </UDrawer>
</template>

<style></style>
