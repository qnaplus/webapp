import { Accordion, Badge, Button, Tabs } from "@heroui/react";
import {
	selectAppliedFilterCount,
	useFilterStore,
} from "../../stores/filters";
import { useSortStore } from "../../stores/sort";
import SeasonFilter from "./filters/SeasonFilter";
import ProgramFilter from "./filters/ProgramFilter";
import AuthorFilter from "./filters/AuthorFilter";
import QuestionStateFilter from "./filters/QuestionStateFilter";
import DateFilters from "./filters/DateFilters";
import TagsFilter from "./filters/TagsFilter";
import BasicSort from "./filters/BasicSort";
import AdvancedSortPanel from "./filters/AdvancedSortPanel";

export default function SearchOptions() {
	const filters = useFilterStore((s) => s.filters);
	const clearFilters = useFilterStore((s) => s.clearFilters);
	const appliedFilterCount = selectAppliedFilterCount(filters);
	const advancedEnabled = useSortStore((s) => s.sort.advancedEnabled);

	return (
		<Accordion>
			<Accordion.Item id="search-options">
				<Accordion.Heading>
					<Accordion.Trigger>
						<span className="flex-1 text-left font-medium">Search Options</span>
						{appliedFilterCount > 0 && <Badge>{appliedFilterCount}</Badge>}
						<Accordion.Indicator />
					</Accordion.Trigger>
				</Accordion.Heading>
				<Accordion.Panel>
					<Accordion.Body>
						<Tabs defaultSelectedKey="filter" variant="secondary">
							<Tabs.ListContainer>
								<Tabs.List>
									<Tabs.Tab id="filter">
										Filter
										<Tabs.Indicator />
									</Tabs.Tab>
									<Tabs.Tab id="sort">
										Sort
										<Tabs.Indicator />
									</Tabs.Tab>
								</Tabs.List>
							</Tabs.ListContainer>
							<Tabs.Panel id="filter">
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
										<Button variant="outline" onPress={clearFilters}>
											Reset Filters
										</Button>
									</div>
								</div>
							</Tabs.Panel>

							<Tabs.Panel id="sort">
								<div className="flex flex-col gap-3 pt-2">
									<AdvancedSortPanel />
									{!advancedEnabled && <BasicSort />}
								</div>
							</Tabs.Panel>
						</Tabs>
					</Accordion.Body>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
