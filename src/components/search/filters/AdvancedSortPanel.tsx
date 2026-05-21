import { Label, ListBox, Select, Switch } from "@heroui/react";
import type { Key } from "react";
import { useMemo } from "react";
import {
	type SortOptions,
	sortOptionsList,
	useSortStore,
} from "../../../stores/sort";
import AdvancedSortList from "../sort/AdvancedSortList";

export default function AdvancedSortPanel() {
	const sort = useSortStore((s) => s.sort);
	const toggleAdvanced = useSortStore((s) => s.toggleAdvanced);
	const addAdvanced = useSortStore((s) => s.addAdvanced);

	const remainingAdvanced = useMemo(
		() => sortOptionsList.filter((o) => !sort.advanced.find((s) => s.value === o.value)),
		[sort.advanced],
	);

	const handleAddAdvanced = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) addAdvanced(next);
	};

	return (
		<div className="flex flex-col gap-3">
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

			{sort.advancedEnabled && (
				<>
					<div className="flex flex-col gap-1">
						<Label className="text-sm text-muted">Add Sort Option</Label>
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
					</div>
					<AdvancedSortList />
				</>
			)}
		</div>
	);
}
