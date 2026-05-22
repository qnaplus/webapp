import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type QuestionStateValue,
	questionStateOptions,
	useFilterStore,
} from "@/stores/filters";

export default function QuestionStateFilter() {
	const state = useFilterStore((s) => s.filters.state);
	const setFilter = useFilterStore((s) => s.setFilter);

	const handleChange = (value: string | null) => {
		if (value === null) return;
		const v = Number(value) as QuestionStateValue;
		const opt = questionStateOptions.find((o) => o.value === v);
		if (opt) setFilter("state", opt);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-42">
			<Label htmlFor="question-state-filter" className="text-sm text-muted-foreground">Question State</Label>
			<Select
				id="question-state-filter"
				value={String(state.value)}
				onValueChange={handleChange}
			>
				<SelectTrigger className="w-full">
					<SelectValue>{state.name}</SelectValue>
				</SelectTrigger>
				<SelectContent>
					{questionStateOptions.map((o) => (
						<SelectItem key={o.value} value={String(o.value)}>
							{o.name}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
