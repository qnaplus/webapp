<script setup lang="ts">
type TagColor =
	| "primary"
	| "secondary"
	| "success"
	| "info"
	| "warning"
	| "error"
	| "neutral";

withDefaults(
	defineProps<{
		label?: string;
		color?: TagColor;
	}>(),
	{ color: "neutral" },
);

const COLOR_CLASSES: Record<TagColor, string> = {
	primary: "bg-primary/15 text-primary",
	secondary: "bg-secondary/15 text-secondary",
	success: "bg-success/15 text-success",
	info: "bg-info/15 text-info",
	warning: "bg-warning/15 text-warning",
	error: "bg-error/15 text-error",
	neutral: "bg-elevated text-default",
};
</script>

<template>
    <span
        class="inline-flex items-center text-xs font-medium px-2 py-0.5"
        :class="COLOR_CLASSES[color]"
    >
        <slot>{{ label }}</slot>
    </span>
</template>
