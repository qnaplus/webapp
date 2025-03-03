<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentContent,
	resolveQuestionComponentProps,
} from "../../composable/componentMap";

defineProps<{
	children: ParserNode[];
}>();
</script>

<template>
    <blockquote class="p-3 border-l-2 bg-surface-900 border-l-surface-800 not-prose">
        <component :is="resolveQuestionComponentContent(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </blockquote>
</template>

<style scoped>
</style>