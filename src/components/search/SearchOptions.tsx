import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import FilterPanel from "./FilterPanel";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function SearchOptions({ open, onOpenChange }: Props) {
	useEffect(() => {
		document.body.style.overflow = open ? "hidden" : "";
		return () => { document.body.style.overflow = ""; };
	}, [open]);

	return (
		<DrawerPrimitive.Root
			open={open}
			onOpenChange={onOpenChange}
			modal={false}
			swipeDirection="left"
			disablePointerDismissal
		>
			<DrawerPrimitive.Portal>
				<DrawerPrimitive.Popup
					className={cn(
						"fixed top-15 bottom-0 left-0 z-40 flex flex-col",
						"w-full",
						"border-r bg-popover text-sm text-popover-foreground shadow-lg",
						"transition duration-200 ease-in-out",
						"translate-x-(--drawer-swipe-movement-x)",
						"data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
						"data-swiping:transition-none",
					)}
				>
					<DrawerPrimitive.Content className="flex h-full flex-col overflow-hidden">
						<FilterPanel onClose={() => onOpenChange(false)} />
					</DrawerPrimitive.Content>
					<DrawerPrimitive.Title className="sr-only">
						Filter options
					</DrawerPrimitive.Title>
					<DrawerPrimitive.Description className="sr-only">
						Filter and refine search results
					</DrawerPrimitive.Description>
				</DrawerPrimitive.Popup>
			</DrawerPrimitive.Portal>
		</DrawerPrimitive.Root>
	);
}
