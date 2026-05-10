<script setup lang="ts">
import Sidebar from "@/components/sidebar/Sidebar.vue";
import SidebarContent from "@/components/sidebar/SidebarContent.vue";
import SidebarFooter from "@/components/sidebar/SidebarFooter.vue";
import SidebarGroup from "@/components/sidebar/SidebarGroup.vue";
import SidebarHeader from "@/components/sidebar/SidebarHeader.vue";
import SidebarProvider from "@/components/sidebar/SidebarProvider.vue";
import SidebarTrigger from "@/components/sidebar/SidebarTrigger.vue";
import type { QnaplusAppData } from "@/database";
import { DEFAULT_PROGRAM, paths } from "@/router/routes";
import Root from "@/router/Root.vue";
import { type Ref, computed, inject } from "vue";
import NavLink from "./NavLink.vue";

const appname = import.meta.env.VITE_APP_NAME;
const appData = inject<Ref<QnaplusAppData | undefined>>("appdata");

const currentSeason = computed(() => appData?.value?.seasons[0]);
</script>

<template>
	<Root :show-header="false">
		<SidebarProvider class="h-full min-h-0 overflow-hidden">
			<Sidebar collapsible="icon" variant="floating">
				<SidebarHeader>
					<div class="flex items-center justify-between gap-2">
						<RouterLink :to="paths.home" class="font-semibold text-sm text-color truncate">
							{{ appname }}
						</RouterLink>
						<SidebarTrigger class="md:hidden -mr-1" />
					</div>
				</SidebarHeader>

				<SidebarContent>
					<SidebarGroup>
						<NavLink
							v-if="currentSeason"
							:to="paths.qa(DEFAULT_PROGRAM, currentSeason)"
							icon="pi-calendar"
							:label="`${DEFAULT_PROGRAM} ${currentSeason}`"
						/>
						<NavLink :to="paths.all" icon="pi-list" label="All Questions" />
					</SidebarGroup>
				</SidebarContent>

				<SidebarFooter class="flex-row justify-center">
					<Button as="a" href="https://nexus.qnapl.us" target="_blank" icon="pi pi-discord" aria-label="Discord Server" text />
					<Button as="a" href="https://github.com/qnaplus" target="_blank" icon="pi pi-github" aria-label="Github" text />
				</SidebarFooter>
			</Sidebar>

			<div class="flex h-full min-h-0 flex-col gap-3 flex-1 min-w-0 overflow-hidden p-4 md:px-8 lg:px-16 xl:px-24">
				<div class="flex items-center">
					<SidebarTrigger />
				</div>
				<slot />
			</div>
		</SidebarProvider>
	</Root>
</template>
