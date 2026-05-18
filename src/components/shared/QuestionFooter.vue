<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";

defineProps<{
	question: Question;
}>();
</script>

<template>
    <USeparator class="my-4" />
    <div class="flex footer gap-3">
        <QuestionTags :tags="question.tags" :program="question.program" />
        <a class="text-muted" :href="question.url" target="_blank">View on RobotEvents
            <UIcon name="i-lucide-external-link" class="ml-1 inline-block align-text-bottom" />
        </a>
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