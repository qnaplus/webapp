<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentNode,
	resolveQuestionComponentProps,
} from "../../rendering";

defineProps<{
	header: string;
	children: ParserNode[];
}>();
</script>

<template>
    <component :is="header">
        <component :is="resolveQuestionComponentNode(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </component>
</template>
