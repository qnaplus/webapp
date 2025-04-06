<script setup lang="ts">
import sanitize from 'sanitize-html';
import * as htmlparser2 from "htmlparser2";
import { Question } from '@qnaplus/scraper';
import type { Node as ParserNode } from "domhandler";
import { ResolvedComponent, resolveQuestionComponent } from "../../composable/useComponentMap";

const props = defineProps<{
  question: Question;
  limit?: number;
  size: "card" | "full";
}>();

const question = props.question;
const limit = props.limit ?? Number.POSITIVE_INFINITY;
const size = props.size;

const allowedAttributes = {
  ...sanitize.defaults.allowedAttributes,
  ol: ["start"]
}
const sanitizeOptions: sanitize.IOptions = {
  allowedTags: sanitize.defaults.allowedTags.concat("img"),
  allowedAttributes
};

const sanitizedQuestionHTML = sanitize(question.questionRaw, sanitizeOptions);
const questionDom = htmlparser2.parseDocument(sanitizedQuestionHTML);
const questionChildren = questionDom.children as ParserNode[];

const sanitizedAnswerHTML = sanitize(question.answerRaw ?? "", sanitizeOptions);
const answerDom = htmlparser2.parseDocument(sanitizedAnswerHTML);
const answerChildren = answerDom.children as ParserNode[];

let truncated = false;
let questionSize = 0;
const renderedQuestionChildren: ResolvedComponent[] = [];
for (const node of questionChildren) {
  if (questionSize >= limit) {
    truncated = true;
    break;
  }
  const component = resolveQuestionComponent(node);
  renderedQuestionChildren.push(component);
  questionSize += component.size;
}

let answerSize = 0;
const renderedAnswerChildren: ResolvedComponent[] = [];
for (const node of answerChildren) {
  if (truncated || answerSize >= limit) {
    truncated = true;
    break;
  }
  const component = resolveQuestionComponent(node);
  renderedAnswerChildren.push(component);
  answerSize += component.size;
}

</script>

<template>
  <div class="flex flex-col gap-2">
    <div>
      <h3 v-if="size === 'full'" class="font-bold">Question</h3>
      <span v-if="size === 'card'" class="font-bold">Question</span>
      <component :is="component.node" v-bind="component.props" v-for="component in renderedQuestionChildren" />
    </div>
    <div v-if="question.answered">
      <h3 v-if="size === 'full'" class="font-bold">Answer</h3>
      <span v-if="size === 'card'" class="font-bold">Answer</span>
      <component :is="component.node" v-bind="component.props" v-for="component in renderedAnswerChildren" />
    </div>
  </div>
</template>
