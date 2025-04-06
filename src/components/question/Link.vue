<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentNode,
	resolveQuestionComponentProps,
} from "../../composable/useComponentMap";

defineProps<{
	href: string;
	children: ParserNode[];
}>();
</script>

<template>
    <a :href="href">
        <component :is="resolveQuestionComponentNode(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </a>
</template>
