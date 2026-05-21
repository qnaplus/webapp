import { Label, ListBox, Select, SelectRoot } from "@heroui/react";
import type { Key } from "react";
import { useAppDataStore } from "../../../stores/appData";
import { useFilterStore } from "../../../stores/filters";

export default function ProgramFilter() {
	const programs = useAppDataStore((s) => s.programs);
	const programFilter = useFilterStore((s) => s.filters.program);
	const setFilter = useFilterStore((s) => s.setFilter);

	const onChange = (keys: Key[]) => {
		setFilter(
			"program",
			keys.map((k) => ({ name: String(k), value: String(k) })),
		);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-50">
			<Label className="text-sm text-muted">Program</Label>
			<SelectRoot<object, "multiple">
				selectionMode="multiple"
				value={programFilter.map((p) => p.value)}
				onChange={onChange}
			>
				<Select.Trigger>
					<Select.Value>
						{programFilter.length === 0
							? "Program"
							: programFilter.map((p) => p.value).join(", ")}
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
		</div>
	);
}
