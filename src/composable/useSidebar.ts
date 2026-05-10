import { inject, type InjectionKey, type Ref } from "vue";

export type SidebarState = "expanded" | "collapsed";

export interface SidebarContext {
	state: Ref<SidebarState>;
	open: Ref<boolean>;
	setOpen: (value: boolean) => void;
	openMobile: Ref<boolean>;
	setOpenMobile: (value: boolean) => void;
	isMobile: Ref<boolean>;
	toggleSidebar: () => void;
}

export const SIDEBAR_KEY: InjectionKey<SidebarContext> = Symbol("Sidebar");

export function useSidebar(): SidebarContext {
	const context = inject(SIDEBAR_KEY);
	if (!context) {
		throw new Error(
			"[Sidebar] useSidebar() must be called within a SidebarProvider.",
		);
	}
	return context;
}
