<script setup lang="ts">
import * as htmlparser2 from "htmlparser2";
import Divider from "primevue/divider";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";
import sanitize from "sanitize-html";
import { ref } from "vue";
import QuestionDetails from "../components/question/QuestionDetails.vue";
import QuestionTags from "../components/shared/QuestionTags.vue";
import { resolveQuestionComponent } from "../composable/componentMap";
import { getQuestion } from "../database";
import Root from "./Root.vue";

const props = defineProps<{
	id: string;
}>();

const loading = ref(true);

const loadContent = async () => {
	const question = await getQuestion(props.id);
	if (question === undefined) {
		return { question: null, questionContent: null, answerContent: null };
	}
	setTimeout(() => {
		loading.value = false;
	}, 500);

  const allowedAttributes = {
    ...sanitize.defaults.allowedAttributes,
    ol: ["start"]
  }
	const sanitizeOptions: sanitize.IOptions = {
		allowedTags: sanitize.defaults.allowedTags.concat("img"),
    allowedAttributes
	};

	const cleanQuestionHTML = sanitize(question.questionRaw, sanitizeOptions);
	const questionContent = htmlparser2
		.parseDocument(cleanQuestionHTML)
		.children.map(resolveQuestionComponent);

	const cleanAnswerHTML = sanitize(question.answerRaw ?? "", sanitizeOptions);
	const answerContent = htmlparser2
		.parseDocument(cleanAnswerHTML)
		.children.map(resolveQuestionComponent);

	return { question, questionContent, answerContent };
};

const { question, questionContent, answerContent } = await loadContent();
</script>

<template>
  <Root>
    <Suspense suspensible>
      <div class="prose prose-invert prose-slate break-words max-w-none p-4">
        <div class="flex flex-col items-center justify-center" v-if="!loading && question === null">
          <h2>uhhhhhhhhhh...</h2>
          <h4>Couldn't find a question here.</h4>
        </div>
        <div v-if="!loading && question !== null">
          <Message severity="secondary" size="small" icon="pi pi-info-circle" :closable="false">
            qnaplus is an unofficial third-party application. <a :href="question.url" target="_blank">Visit the Q&A on RobotEvents</a> to get the most up-to-date information.
          </Message>
          <h2 class="mb-1">{{ question.title }}</h2>
          <question-details :question="question" />
          <Divider />
          <div class="px-5 pb-3">
            <h3>Question</h3>
            <div class="text-surface-300">
              <component :is="component.node" v-bind="component.props" v-for="component in questionContent" />
            </div>
          </div>
          <div v-if="question.answered" class="border border-green-700 rounded-md px-5">
            <h3>Answer</h3>
            <div>
              <component :is="component.node" v-bind="component.props" v-for="component in answerContent" />
            </div>
          </div>
          <Divider />
          <div class="flex footer gap-3">
            <QuestionTags :tags="question.tags" :program="question.program" />
            <a class="text-muted-color" :href="question.url" target="_blank">View on RobotEvents <i
                class=" ml-1 pi pi-external-link"></i></a>
          </div>
        </div>
        <div v-else class="h-full flex flex-col items-center justify-center">
          <ProgressSpinner style="width: 40px; height: 40px; margin: 0;" strokeWidth="6" fill="transparent"
            animationDuration="0.5s" />
        </div>
      </div>
    </Suspense>
  </Root>
</template>

<style scoped>
.answer {
  background-color: color-mix(in srgb, #22c55e, #00000000 80%) !important;
  border: 1px solid #34774d;
  padding: 1px 20px;
  border-radius: 8px;
}

@media screen and (max-width: 1199px) {
  .footer {
    flex-direction: column;
  }
}

@media screen and (min-width: 1200px) {
  .footer {
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>
