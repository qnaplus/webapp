import { IconX } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
	onClose?: () => void;
};

export default function FilterPanel({ onClose }: Props) {
	const filters = useFilterStore((s) => s.filters);
	const clearFilters = useFilterStore((s) => s.clearFilters);
	const appliedFilterCount = selectAppliedFilterCount(filters);

	return (
		<div className="flex h-full flex-col overflow-hidden">
			<div className="flex items-center justify-between border-b p-4">
				<div className="flex items-center gap-2">
					<span className="font-semibold text-base">Filters</span>
					{appliedFilterCount > 0 && <Badge>{appliedFilterCount}</Badge>}
				</div>
				{onClose && (
					<Button
						variant="ghost"
						size="icon-sm"
						onClick={onClose}
						aria-label="Close filters"
					>
						<IconX size={16} />
					</Button>
				)}
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
		</div>
	);
}
