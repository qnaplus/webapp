<script setup lang="ts">
import { ref } from "vue";
import QuestionDetails from "../components/question/QuestionDetails.vue";
import QuestionTags from "../components/shared/QuestionTags.vue";
import { renderQuestion } from "../composable/useComponentMap";
import { getQuestion } from "../database";
import Root from "./Root.vue";
import QuestionFooter from "../components/shared/QuestionFooter.vue";

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
  const { questionContent, answerContent } = renderQuestion(question);
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
            qnaplus is an unofficial third-party application. <a :href="question.url" target="_blank">Visit the Q&A on
              RobotEvents</a> to get the most up-to-date information.
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
          <QuestionFooter :question="question" />
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
</style>
