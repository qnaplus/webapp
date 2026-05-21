import { Label, ListBox, Select, SelectRoot } from "@heroui/react";
import type { Key } from "react";
import { useAppDataStore } from "../../../stores/appData";
import { useFilterStore } from "../../../stores/filters";

export default function SeasonFilter() {
	const seasons = useAppDataStore((s) => s.seasons);
	const seasonFilter = useFilterStore((s) => s.filters.season);
	const setFilter = useFilterStore((s) => s.setFilter);

	const onChange = (keys: Key[]) => {
		setFilter(
			"season",
			keys.map((k) => ({ name: String(k), value: String(k) })),
		);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-50">
			<Label className="text-sm text-muted">Season</Label>
			<SelectRoot<object, "multiple">
				selectionMode="multiple"
				value={seasonFilter.map((s) => s.value)}
				onChange={onChange}
			>
				<Select.Trigger>
					<Select.Value>
						{seasonFilter.length === 0
							? "Season"
							: seasonFilter.map((s) => s.value).join(", ")}
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
		</div>
	);
}
