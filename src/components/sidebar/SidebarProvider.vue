<script setup lang="ts">
import { computed, provide, ref } from "vue";
import { useMediaQuery } from "@vueuse/core";
import {
	SIDEBAR_KEY,
	type SidebarContext,
	type SidebarState,
} from "@/composable/useSidebar";

interface Props {
	/** Initial open state when uncontrolled */
	defaultOpen?: boolean;
	/** Controlled open state — pair with v-model:open */
	open?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	defaultOpen: true,
});

const emit = defineEmits<{
	"update:open": [value: boolean];
}>();

const isMobile = useMediaQuery("(max-width: 767px)");
const internalOpen = ref(props.defaultOpen);

const open = computed<boolean>({
	get: () => (props.open !== undefined ? props.open : internalOpen.value),
	set: (val) => {
		internalOpen.value = val;
		emit("update:open", val);
	},
});

const openMobile = ref(false);
const state = computed<SidebarState>(() =>
	open.value ? "expanded" : "collapsed",
);

function setOpen(value: boolean) {
	open.value = value;
}

function setOpenMobile(value: boolean) {
	openMobile.value = value;
}

function toggleSidebar() {
	if (isMobile.value) {
		openMobile.value = !openMobile.value;
	} else {
		open.value = !open.value;
	}
}

provide<SidebarContext>(SIDEBAR_KEY, {
	state,
	open,
	setOpen,
	openMobile,
	setOpenMobile,
	isMobile,
	toggleSidebar,
});
</script>

<template>
	<div
		class="group/sidebar-wrapper flex w-full"
		style="--sidebar-width: 19.75rem; --sidebar-width-icon: 3rem;"
	>
		<slot />
	</div>
</template>
