import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
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

export default function SearchOptions() {
	const filters = useFilterStore((s) => s.filters);
	const clearFilters = useFilterStore((s) => s.clearFilters);
	const appliedFilterCount = selectAppliedFilterCount(filters);

	return (
		<Accordion className={"p-1 border"}>
			<AccordionItem value="search-options">
				<AccordionTrigger className="px-3">
					<span className="flex-1 text-left font-semibold text-base">Search Options</span>
					{appliedFilterCount > 0 && (
						<Badge className="ml-2">{appliedFilterCount}</Badge>
					)}
				</AccordionTrigger>
				<AccordionContent className="p-2">
					<div className="flex flex-col gap-3 pt-2">
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

						<div>
							<Button variant="outline" onClick={clearFilters}>
								Reset Filters
							</Button>
						</div>
					</div>
				</AccordionContent>
			</AccordionItem>
		</Accordion>
	);
}
