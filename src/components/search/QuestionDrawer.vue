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
    <Drawer class="!w-full md:!w-80 lg:!w-[60rem]" @hide="$emit('hide-drawer')" v-model:visible="visible"
        position="right">
        <div class="prose prose-invert prose-slate break-words max-w-none p-4" v-if="question !== undefined">
            <Message severity="secondary" size="small" icon="pi pi-info-circle" :closable="false">
                qnaplus is an unofficial third-party application. <a :href="question.url" target="_blank">Visit the Q&A on RobotEvents</a> to get the most up-to-date information.
            </Message>
            <h2 class="mb-1">{{ question.title }}</h2>
            <question-details :question="question" />
            <Divider />
            <div class="px-5 pb-3">
                <h3>Question</h3>
                <div class="text-surface-300">
                    <component :is="component.node" v-bind="component.props"
                        v-for="component in content.questionContent" />
                </div>
            </div>
            <div v-if="question.answered" class="border border-green-700 rounded-md px-5">
                <h3>Answer</h3>
                <div>
                    <component :is="component.node" v-bind="component.props"
                        v-for="component in content.answerContent" />
                </div>
            </div>
            <QuestionFooter :question="question" />
        </div>
    </Drawer>
</template>

<style></style>
