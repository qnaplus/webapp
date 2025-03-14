<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import type { Node as ParserNode } from "domhandler";
import * as htmlparser2 from "htmlparser2";
import Card from "primevue/card";
import Divider from "primevue/divider";
import sanitize from "sanitize-html";
import { RouterLink } from "vue-router";
import { resolveQuestionComponent } from "../../composable/componentMap";
import QuestionDetails from "../question/QuestionDetails.vue";
import QuestionTags from "../shared/QuestionTags.vue";

const question = defineProps<Question>();

const MAX_CONTENT_SIZE = 75;

const sanitizeOptions: sanitize.IOptions = {
	allowedTags: sanitize.defaults.allowedTags.concat("img"),
};

const sanitizedQuestionHTML = sanitize(question.questionRaw, sanitizeOptions);
const questionDom = htmlparser2.parseDocument(sanitizedQuestionHTML);
const questionChildren = questionDom.children as ParserNode[];

const sanitizedAnswerHTML = sanitize(question.answerRaw ?? "", sanitizeOptions);
const answerDom = htmlparser2.parseDocument(sanitizedAnswerHTML);
const answerChildren = answerDom.children as ParserNode[];

let truncated = false;
let questionSize = 0;
const renderedQuestionChildren: ReturnType<typeof resolveQuestionComponent>[] =
	[];
for (const node of questionChildren) {
	if (questionSize >= MAX_CONTENT_SIZE) {
		truncated = true;
		break;
	}
	const component = resolveQuestionComponent(node);
	renderedQuestionChildren.push(component);
	questionSize += component.size;
}

let answerSize = 0;
const renderedAnswerChildren: ReturnType<typeof resolveQuestionComponent>[] =
	[];
for (const node of answerChildren) {
	if (truncated || answerSize >= MAX_CONTENT_SIZE) {
		truncated = true;
		break;
	}
	const component = resolveQuestionComponent(node);
	renderedAnswerChildren.push(component);
	answerSize += component.size;
}
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
                    <component :is="component.node" v-bind="component.props"
                        v-for="component in renderedQuestionChildren" />
                </div>
                <div v-if="answered">
                    <span class="font-bold">Answer</span>
                    <component :is="component.node" v-bind="component.props"
                        v-for="component in renderedAnswerChildren" />
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
