import { Label, ListBox, Select } from "@heroui/react";
import type { Key } from "react";
import {
	type SortOptions,
	sortOptionsList,
	sortOrderList,
	useSortStore,
} from "../../../stores/sort";

export default function BasicSort() {
	const sort = useSortStore((s) => s.sort.basic);
	const setBasicSort = useSortStore((s) => s.setBasicSort);
	const setBasicAsc = useSortStore((s) => s.setBasicAsc);

	const handleSortChange = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) setBasicSort(next);
	};

	const handleOrderChange = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key);
		const next = sortOrderList.find((o) => o.value === v);
		if (next) setBasicAsc(next);
	};

	return (
		<div className="flex flex-wrap gap-2">
			<div className="flex flex-col gap-1 flex-1">
				<Label className="text-sm text-muted">Sort By</Label>
				<Select.Root
					selectedKey={String(sort.sort.value)}
					onSelectionChange={handleSortChange}
				>
					<Select.Trigger>
						<Select.Value>{sort.sort.name}</Select.Value>
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
			</div>
			<div className="flex flex-col gap-1 flex-1">
				<Label className="text-sm text-muted">Order</Label>
				<Select.Root
					selectedKey={String(sort.asc.value)}
					onSelectionChange={handleOrderChange}
				>
					<Select.Trigger>
						<Select.Value>{sort.asc.name}</Select.Value>
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
			</div>
		</div>
	);
}
