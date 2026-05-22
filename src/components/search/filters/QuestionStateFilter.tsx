import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
	type QuestionStateValue,
	questionStateOptions,
	useFilterStore,
} from "@/stores/filters";

export default function QuestionStateFilter() {
	const state = useFilterStore((s) => s.filters.state);
	const setFilter = useFilterStore((s) => s.setFilter);

	const handleChange = (next: string[]) => {
		const first = next[0];
		if (first === undefined) return;
		const v = Number(first) as QuestionStateValue;
		const opt = questionStateOptions.find((o) => o.value === v);
		if (opt) setFilter("state", opt);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-42">
			<Label className="text-sm text-muted-foreground">Question State</Label>
			<ToggleGroup
				variant="outline"
				spacing={0}
				className="flex w-full"
				value={[String(state.value)]}
				onValueChange={handleChange}
			>
				{questionStateOptions.map((o) => (
					<ToggleGroupItem
						key={o.value}
						value={String(o.value)}
						className="flex-1"
					>
						{o.name}
					</ToggleGroupItem>
				))}
			</ToggleGroup>
		</div>
	);
}
