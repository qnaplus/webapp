<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import Drawer from "primevue/drawer";
import { renderQuestion } from "../../composable";
import { computed } from "vue";

const { question } = defineProps<{
    question: Question | undefined;
}>();
const visible = computed(() => question !== undefined);
console.log(visible)
const { questionContent, answerContent } = renderQuestion(question);
</script>


<template>
    <Drawer v-model:visible="visible" :position="'right'">

    </Drawer>
</template>

<style></style>
