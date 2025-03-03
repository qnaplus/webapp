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
    <li>
        <component :is="resolveQuestionComponentContent(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </li>
</template>
