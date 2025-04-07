<script setup lang="ts">
import type { Question } from '@qnaplus/scraper';

defineProps<{
    question: Question;
}>();
</script>

<template>
    <Divider />
    <div class="flex footer gap-3">
        <QuestionTags :tags="question.tags" :program="question.program" />
        <a class="text-muted-color" :href="question.url" target="_blank">View on RobotEvents <i
                class=" ml-1 pi pi-external-link"></i></a>
    </div>
</template>

<style lang="css" scoped>
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