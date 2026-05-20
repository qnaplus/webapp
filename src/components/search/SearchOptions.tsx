import {
	Accordion,
	Badge,
	Button,
	ComboBox,
	DatePicker,
	Input,
	Label,
	ListBox,
	Select,
	SelectRoot,
	Switch,
	Tabs,
	ToggleButton,
	ToggleButtonGroup,
} from "@heroui/react";
import {
	type CalendarDate,
	getLocalTimeZone,
	parseDate,
} from "@internationalized/date";
import type { Key, ReactNode } from "react";
import { useMemo, useState } from "react";
import {
	getAuthorSuggestions,
	getTagSuggestions,
} from "../../lib/minisearch";
import { useAppDataStore } from "../../stores/appData";
import {
	QuestionStateValue,
	questionStateOptions,
	selectAppliedFilterCount,
	useFilterStore,
} from "../../stores/filters";
import {
	SortOptions,
	sortOptionsList,
	sortOrderList,
	useSortStore,
} from "../../stores/sort";
import AdvancedSortList from "./sort/AdvancedSortList";

const toCalendarDate = (d: Date | null): CalendarDate | null => {
	if (d === null) return null;
	const iso = d.toISOString().slice(0, 10);
	return parseDate(iso);
};

const fromCalendarDate = (d: CalendarDate | null): Date | null => {
	if (d === null) return null;
	return d.toDate(getLocalTimeZone());
};

type LabeledFieldProps = {
	label: string;
	children: ReactNode;
	className?: string;
};

const LabeledField = ({ label, children, className }: LabeledFieldProps) => (
	<div className={`flex flex-col gap-1 ${className ?? ""}`}>
		<Label className="text-sm text-muted">{label}</Label>
		{children}
	</div>
);

export default function SearchOptions() {
	const seasons = useAppDataStore((s) => s.seasons);
	const programs = useAppDataStore((s) => s.programs);

	const filters = useFilterStore((s) => s.filters);
	const setFilter = useFilterStore((s) => s.setFilter);
	const clearFilters = useFilterStore((s) => s.clearFilters);
	const appliedFilterCount = selectAppliedFilterCount(filters);

	const sort = useSortStore((s) => s.sort);
	const setBasicSort = useSortStore((s) => s.setBasicSort);
	const setBasicAsc = useSortStore((s) => s.setBasicAsc);
	const toggleAdvanced = useSortStore((s) => s.toggleAdvanced);
	const addAdvanced = useSortStore((s) => s.addAdvanced);

	const [authorInput, setAuthorInput] = useState(filters.author ?? "");
	const [tagInput, setTagInput] = useState("");

	const authorSuggestions = useMemo(
		() => getAuthorSuggestions(authorInput === "" ? null : authorInput),
		[authorInput],
	);
	const tagSuggestions = useMemo(
		() => getTagSuggestions(tagInput === "" ? undefined : tagInput),
		[tagInput],
	);

	const remainingAdvanced = useMemo(
		() => sortOptionsList.filter((o) => !sort.advanced.find((s) => s.value === o.value)),
		[sort.advanced],
	);

	const onMultiSelectChange =
		<T extends string>(field: "season" | "program") =>
		(keys: Key[]) => {
			setFilter(
				field,
				keys.map((k) => ({ name: String(k) as T, value: String(k) as T })),
			);
		};

	const handleBasicSortChange = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) setBasicSort(next);
	};

	const handleBasicOrderChange = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key);
		const next = sortOrderList.find((o) => o.value === v);
		if (next) setBasicAsc(next);
	};

	const handleAddAdvanced = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) addAdvanced(next);
	};

	const handleQuestionStateChange = (keys: "all" | Set<Key>) => {
		if (keys === "all") return;
		const first = [...keys][0];
		if (first === undefined) return;
		const v = Number(first) as QuestionStateValue;
		const opt = questionStateOptions.find((o) => o.value === v);
		if (opt) setFilter("state", opt);
	};

	const handleAuthorSelection = (key: Key | null) => {
		const v = key === null ? null : String(key);
		setFilter("author", v);
		setAuthorInput(v ?? "");
	};

	const handleTagSelected = (key: Key | null) => {
		if (key === null) return;
		const v = String(key);
		if (filters.tags.includes(v)) return;
		setFilter("tags", [...filters.tags, v]);
		setTagInput("");
	};

	const removeTag = (tag: string) =>
		setFilter("tags", filters.tags.filter((t) => t !== tag));

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
							<Tabs.List>
								<Tabs.Tab id="filter">Filter</Tabs.Tab>
								<Tabs.Tab id="sort">Sort</Tabs.Tab>
							</Tabs.List>

							<Tabs.Panel id="filter">
								<div className="flex flex-col gap-3 pt-2">
									<div className="flex flex-wrap gap-2">
										<LabeledField label="Season" className="flex-1 min-w-50">
											<SelectRoot<object, "multiple">
												selectionMode="multiple"
												value={filters.season.map((s) => s.value)}
												onChange={onMultiSelectChange<string>("season")}
											>
												<Select.Trigger>
													<Select.Value>
														{filters.season.length === 0
															? "Season"
															: filters.season.map((s) => s.value).join(", ")}
													</Select.Value>
													<Select.Indicator />
												</Select.Trigger>
												<Select.Popover>
													<ListBox>
														{seasons.map((s) => (
															<ListBox.Item key={s} id={s}>
																{s}
															</ListBox.Item>
														))}
													</ListBox>
												</Select.Popover>
											</SelectRoot>
										</LabeledField>

										<LabeledField label="Program" className="flex-1 min-w-50">
											<SelectRoot<object, "multiple">
												selectionMode="multiple"
												value={filters.program.map((p) => p.value)}
												onChange={onMultiSelectChange<string>("program")}
											>
												<Select.Trigger>
													<Select.Value>
														{filters.program.length === 0
															? "Program"
															: filters.program.map((p) => p.value).join(", ")}
													</Select.Value>
													<Select.Indicator />
												</Select.Trigger>
												<Select.Popover>
													<ListBox>
														{programs.map((p) => (
															<ListBox.Item key={p} id={p}>
																{p}
															</ListBox.Item>
														))}
													</ListBox>
												</Select.Popover>
											</SelectRoot>
										</LabeledField>
									</div>

									<div className="flex flex-wrap gap-2">
										<LabeledField label="Author" className="flex-1 min-w-42">
											<ComboBox
												inputValue={authorInput}
												onInputChange={setAuthorInput}
												onSelectionChange={handleAuthorSelection}
												onBlur={() =>
													setFilter("author", authorInput === "" ? null : authorInput)
												}
											>
												<ComboBox.InputGroup>
													<Input placeholder="Author" />
													<ComboBox.Trigger />
												</ComboBox.InputGroup>
												<ComboBox.Popover>
													<ListBox>
														{authorSuggestions.map((a) => (
															<ListBox.Item key={a} id={a}>
																{a}
															</ListBox.Item>
														))}
													</ListBox>
												</ComboBox.Popover>
											</ComboBox>
										</LabeledField>

										<LabeledField label="Question State" className="flex-1 min-w-42">
											<ToggleButtonGroup
												selectionMode="single"
												selectedKeys={new Set([String(filters.state.value)])}
												onSelectionChange={handleQuestionStateChange}
												isDetached={false}
											>
												{questionStateOptions.map((o) => (
													<ToggleButton key={o.value} id={String(o.value)}>
														{o.name}
													</ToggleButton>
												))}
											</ToggleButtonGroup>
										</LabeledField>
									</div>

									<div className="flex flex-wrap gap-2">
										<LabeledField label="Asked Before" className="flex-1 min-w-37">
											<DatePicker
												value={toCalendarDate(filters.askedBefore)}
												onChange={(d) =>
													setFilter("askedBefore", fromCalendarDate(d))
												}
											/>
										</LabeledField>
										<LabeledField label="Asked After" className="flex-1 min-w-37">
											<DatePicker
												value={toCalendarDate(filters.askedAfter)}
												onChange={(d) =>
													setFilter("askedAfter", fromCalendarDate(d))
												}
											/>
										</LabeledField>
										<LabeledField label="Answered Before" className="flex-1 min-w-37">
											<DatePicker
												value={toCalendarDate(filters.answeredBefore)}
												onChange={(d) =>
													setFilter("answeredBefore", fromCalendarDate(d))
												}
											/>
										</LabeledField>
										<LabeledField label="Answered After" className="flex-1 min-w-37">
											<DatePicker
												value={toCalendarDate(filters.answeredAfter)}
												onChange={(d) =>
													setFilter("answeredAfter", fromCalendarDate(d))
												}
											/>
										</LabeledField>
									</div>

									<LabeledField label="Tags">
										<ComboBox
											inputValue={tagInput}
											onInputChange={setTagInput}
											onSelectionChange={handleTagSelected}
										>
											<ComboBox.InputGroup>
												<Input placeholder="Add a tag…" />
												<ComboBox.Trigger />
											</ComboBox.InputGroup>
											<ComboBox.Popover>
												<ListBox>
													{tagSuggestions.map((t) => (
														<ListBox.Item key={t} id={t}>
															{t}
														</ListBox.Item>
													))}
												</ListBox>
											</ComboBox.Popover>
										</ComboBox>
										{filters.tags.length > 0 && (
											<div className="flex flex-wrap gap-2 mt-2">
												{filters.tags.map((tag) => (
													<Button
														key={tag}
														size="sm"
														variant="outline"
														onPress={() => removeTag(tag)}
													>
														{tag} ✕
													</Button>
												))}
											</div>
										)}
									</LabeledField>

									<div>
										<Button size="sm" variant="outline" onPress={clearFilters}>
											Reset Filters
										</Button>
									</div>
								</div>
							</Tabs.Panel>

							<Tabs.Panel id="sort">
								<div className="flex flex-col gap-3 pt-2">
									<div className="flex justify-end">
										<Switch
											isSelected={sort.advancedEnabled}
											onChange={toggleAdvanced}
										>
											<Switch.Control>
												<Switch.Thumb />
											</Switch.Control>
											<Switch.Content className="text-sm text-muted">
												Advanced Sorting
											</Switch.Content>
										</Switch>
									</div>

									{!sort.advancedEnabled ? (
										<div className="flex flex-wrap gap-2">
											<LabeledField label="Sort By" className="flex-1">
												<Select.Root
													selectedKey={String(sort.basic.sort.value)}
													onSelectionChange={handleBasicSortChange}
												>
													<Select.Trigger>
														<Select.Value>{sort.basic.sort.name}</Select.Value>
														<Select.Indicator />
													</Select.Trigger>
													<Select.Popover>
														<ListBox>
															{sortOptionsList.map((o) => (
																<ListBox.Item key={o.value} id={String(o.value)}>
																	{o.name}
																</ListBox.Item>
															))}
														</ListBox>
													</Select.Popover>
												</Select.Root>
											</LabeledField>
											<LabeledField label="Order" className="flex-1">
												<Select.Root
													selectedKey={String(sort.basic.asc.value)}
													onSelectionChange={handleBasicOrderChange}
												>
													<Select.Trigger>
														<Select.Value>{sort.basic.asc.name}</Select.Value>
														<Select.Indicator />
													</Select.Trigger>
													<Select.Popover>
														<ListBox>
															{sortOrderList.map((o) => (
																<ListBox.Item key={o.value} id={String(o.value)}>
																	{o.name}
																</ListBox.Item>
															))}
														</ListBox>
													</Select.Popover>
												</Select.Root>
											</LabeledField>
										</div>
									) : (
										<div className="flex flex-col gap-3">
											<LabeledField label="Add Sort Option">
												<Select.Root
													selectedKey={null}
													onSelectionChange={handleAddAdvanced}
												>
													<Select.Trigger>
														<Select.Value>Add…</Select.Value>
														<Select.Indicator />
													</Select.Trigger>
													<Select.Popover>
														<ListBox>
															{remainingAdvanced.map((o) => (
																<ListBox.Item key={o.value} id={String(o.value)}>
																	{o.name}
																</ListBox.Item>
															))}
														</ListBox>
													</Select.Popover>
												</Select.Root>
											</LabeledField>
											<AdvancedSortList />
										</div>
									)}
								</div>
							</Tabs.Panel>
						</Tabs>
					</Accordion.Body>
				</Accordion.Panel>
			</Accordion.Item>
		</Accordion>
	);
}
