import { Label, ToggleButton, ToggleButtonGroup } from "@heroui/react";
import type { Key } from "react";
import {
	QuestionStateValue,
	questionStateOptions,
	useFilterStore,
} from "../../../stores/filters";

export default function QuestionStateFilter() {
	const state = useFilterStore((s) => s.filters.state);
	const setFilter = useFilterStore((s) => s.setFilter);

	const handleChange = (keys: "all" | Set<Key>) => {
		if (keys === "all") return;
		const first = [...keys][0];
		if (first === undefined) return;
		const v = Number(first) as QuestionStateValue;
		const opt = questionStateOptions.find((o) => o.value === v);
		if (opt) setFilter("state", opt);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-42">
			<Label className="text-sm text-muted">Question State</Label>
			<ToggleButtonGroup
				className="flex w-full"
				selectionMode="single"
				selectedKeys={new Set([String(state.value)])}
				onSelectionChange={handleChange}
				isDetached={false}
			>
				{questionStateOptions.map((o) => (
					<ToggleButton key={o.value} id={String(o.value)} className="flex-1">
						{o.name}
					</ToggleButton>
				))}
			</ToggleButtonGroup>
		</div>
	);
}
