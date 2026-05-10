<script setup lang="ts">
defineProps<{
	to: string;
	icon: string;
	label: string;
}>();
</script>

<template>
	<RouterLink :to="to" custom v-slot="{ href, navigate, isExactActive }">
		<a
			:href="href"
			@click="navigate"
			:class="[
				'flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors',
				isExactActive
					? 'bg-primary-500/10 text-primary-500 font-medium'
					: 'text-color hover:bg-surface-100 dark:hover:bg-surface-800',
			]"
		>
			<i :class="`pi ${icon} shrink-0`" />
			<span class="truncate">{{ label }}</span>
		</a>
	</RouterLink>
</template>
