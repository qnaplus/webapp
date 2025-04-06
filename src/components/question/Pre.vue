<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentNode,
	resolveQuestionComponentProps,
} from "../../composable/useComponentMap";

defineProps<{
	children: ParserNode[];
}>();
</script>

<template>
    <pre>
        <component :is="resolveQuestionComponentNode(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </pre>
</template>

<style scoped>
</style>
