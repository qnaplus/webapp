<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentNode,
	resolveQuestionComponentProps,
} from "../../rendering";

defineProps<{
	children: ParserNode[];
	start?: number;
}>();
</script>

<template>
    <prose-ol :start="start">
        <component :is="resolveQuestionComponentNode(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </prose-ol>
</template>
