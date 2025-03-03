<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentContent,
	resolveQuestionComponentProps,
} from "../../composable/componentMap";

defineProps<{
	href: string;
	children: ParserNode[];
}>();
</script>

<template>
    <a :href="href">
        <component :is="resolveQuestionComponentContent(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </a>
</template>
