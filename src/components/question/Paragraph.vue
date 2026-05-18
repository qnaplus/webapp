<script setup lang="ts">
import type { Node as ParserNode } from "domhandler";
import {
	resolveQuestionComponentNode,
	resolveQuestionComponentProps,
} from "../../rendering";

defineProps<{
	children: ParserNode[];
}>();
</script>

<template>
    <prose-p class="mt-0">
        <component :is="resolveQuestionComponentNode(child)" v-bind="resolveQuestionComponentProps(child)"
            v-for="child in children" />
    </prose-p>
</template>

<style lang="css" scoped>

</style>