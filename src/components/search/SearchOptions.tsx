import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IconX } from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import {
	selectAppliedFilterCount,
	useFilterStore,
} from "@/stores/filters";
import AuthorFilter from "./filters/AuthorFilter";
import DateFilters from "./filters/DateFilters";
import ProgramFilter from "./filters/ProgramFilter";
import QuestionStateFilter from "./filters/QuestionStateFilter";
import SeasonFilter from "./filters/SeasonFilter";
import TagsFilter from "./filters/TagsFilter";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export default function SearchOptions({ open, onOpenChange }: Props) {
	const filters = useFilterStore((s) => s.filters);
	const clearFilters = useFilterStore((s) => s.clearFilters);
	const appliedFilterCount = selectAppliedFilterCount(filters);

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
						"w-full sm:w-1/5",
						"border-r bg-popover text-sm text-popover-foreground shadow-lg",
						"transition duration-200 ease-in-out",
						"translate-x-(--drawer-swipe-movement-x)",
						"data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
						"data-swiping:transition-none",
					)}
				>
					<DrawerPrimitive.Content className="flex h-full flex-col overflow-y-auto">
						<div className="flex items-center justify-between border-b p-4">
							<div className="flex items-center gap-2">
								<span className="font-semibold text-base">Filters</span>
								{appliedFilterCount > 0 && (
									<Badge>{appliedFilterCount}</Badge>
								)}
							</div>
							<DrawerPrimitive.Close
								render={
									<Button variant="ghost" size="icon-sm" />
								}
							>
								<IconX size={16} />
								<span className="sr-only">Close filters</span>
							</DrawerPrimitive.Close>
						</div>
						<div className="flex flex-col gap-3 p-4 overflow-y-auto flex-1">
							<Button variant="destructive" onClick={clearFilters}>
								Reset Filters
							</Button>

							<div className="flex flex-wrap gap-2">
								<SeasonFilter />
								<ProgramFilter />
							</div>

							<div className="flex flex-wrap gap-2">
								<AuthorFilter />
								<QuestionStateFilter />
							</div>

							<DateFilters />

							<TagsFilter />


						</div>
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
