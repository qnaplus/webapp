<script setup lang="ts">
import { computed } from "vue";
import { useSidebar } from "@/composable/useSidebar";

interface Props {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	/** offcanvas: slides to zero width; icon: shrinks to icon width; none: always visible */
	collapsible?: "offcanvas" | "icon" | "none";
}

const props = withDefaults(defineProps<Props>(), {
	side: "left",
	variant: "sidebar",
	collapsible: "offcanvas",
});

const { state, openMobile, setOpenMobile, isMobile } = useSidebar();

const isFloating = computed(
	() => props.variant === "floating" || props.variant === "inset",
);

const sidebarWidth = computed(() =>
	isFloating.value
		? "calc(var(--sidebar-width) + 1rem)"
		: "var(--sidebar-width)",
);

// Outer wrapper transitions its own width; inner keeps full width (content
// is clipped by overflow-hidden when the outer shrinks).
const outerWidthClass = computed(() => {
	if (state.value === "expanded") {
		return isFloating.value
			? "w-[calc(var(--sidebar-width)+1rem)]"
			: "w-[var(--sidebar-width)]";
	}
	if (props.collapsible === "icon") {
		return isFloating.value
			? "w-[calc(var(--sidebar-width-icon)+1rem)]"
			: "w-[var(--sidebar-width-icon)]";
	}
	return "w-0";
});

const borderClass = computed(() => {
	if (props.variant !== "sidebar" || state.value !== "expanded") return "";
	return props.side === "left"
		? "border-r border-surface-200 dark:border-surface-700"
		: "border-l border-surface-200 dark:border-surface-700";
});

const mobileVisible = computed({
	get: () => openMobile.value,
	set: (val: boolean) => setOpenMobile(val),
});
</script>

<template>
	<!-- Mobile: PrimeVue Drawer -->
	<template v-if="isMobile">
		<Drawer
			v-model:visible="mobileVisible"
			:position="side"
			:pt="{
				header: { class: '!hidden' },
				content: { class: '!p-0 flex flex-col h-full overflow-hidden' },
			}"
			:style="{ width: 'var(--sidebar-width)' }"
			data-sidebar="sidebar"
			data-mobile="true"
		>
			<div class="flex h-full w-full flex-col">
				<slot />
			</div>
		</Drawer>
	</template>

	<!-- Desktop: collapsible="none" — always visible, no transition needed -->
	<div
		v-else-if="collapsible === 'none'"
		class="hidden md:flex shrink-0 flex-col bg-surface-0 dark:bg-surface-900 overflow-hidden"
		:class="
			side === 'left'
				? 'border-r border-surface-200 dark:border-surface-700'
				: 'border-l border-surface-200 dark:border-surface-700'
		"
		data-sidebar="sidebar"
		:style="{ width: sidebarWidth }"
	>
		<slot />
	</div>

	<!-- Desktop: collapsible — outer transitions width, inner stays full-width -->
	<div
		v-else
		class="group peer hidden md:flex shrink-0 overflow-hidden transition-[width] duration-200 ease-linear"
		:class="[outerWidthClass, borderClass]"
		:data-state="state"
		:data-collapsible="collapsible"
		:data-variant="variant"
		:data-side="side"
		data-sidebar="sidebar"
	>
		<div
			class="flex shrink-0 flex-col bg-surface-0 dark:bg-surface-900 h-full"
			:class="
				isFloating
					? 'rounded-lg border border-surface-200 dark:border-surface-700 shadow-sm p-2'
					: ''
			"
			:style="{ width: sidebarWidth }"
			data-sidebar="sidebar-inner"
		>
			<slot />
		</div>
	</div>
</template>
