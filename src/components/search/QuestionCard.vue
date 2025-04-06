<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import Card from "primevue/card";
import Divider from "primevue/divider";
import { RouterLink } from "vue-router";
import { renderQuestion } from "../../composable/useComponentMap";
import QuestionDetails from "../question/QuestionDetails.vue";
import QuestionTags from "../shared/QuestionTags.vue";

const question = defineProps<Question>();
const { questionContent, answerContent } = renderQuestion(question, {
    limit: 75
});

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
            <router-link class="prose-a" :to="`/${id}`">{{ title }}</router-link>
        </template>
        <template #subtitle>
            <question-details :question="question" />
        </template>
        <template #content>
            <div class="flex flex-col gap-2">
                <div>
                    <span class="font-bold">Question</span>
                    <component :is="component.node" v-bind="component.props" v-for="component in questionContent" />
                </div>
                <div v-if="answered">
                    <span class="font-bold">Answer</span>
                    <component :is="component.node" v-bind="component.props" v-for="component in answerContent" />
                </div>
            </div>
        </template>
        <template #footer>
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
