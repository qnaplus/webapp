<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentNode,
	resolveQuestionComponentProps,
} from "../../composable/componentMap";

defineProps<{
	children: ParserNode[];
}>();
</script>

<template>
    <mark>
        <component :is="resolveQuestionComponentNode(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </mark>
</template>

<style scoped>
</style>