import { Label } from "@/components/ui/label";
import { useFilterStore } from "@/stores/filters";
import DatePicker from "@/components/lib/DatePicker";

export default function DateFilters() {
	const filters = useFilterStore((s) => s.filters);
	const setFilter = useFilterStore((s) => s.setFilter);

	return (
		<div className="flex flex-wrap gap-2">
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted-foreground">Asked Before</Label>
				<DatePicker
					value={filters.askedBefore}
					onChange={(d) => setFilter("askedBefore", d)}
				/>
			</div>
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted-foreground">Asked After</Label>
				<DatePicker
					value={filters.askedAfter}
					onChange={(d) => setFilter("askedAfter", d)}
				/>
			</div>
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted-foreground">Answered Before</Label>
				<DatePicker
					value={filters.answeredBefore}
					onChange={(d) => setFilter("answeredBefore", d)}
				/>
			</div>
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted-foreground">Answered After</Label>
				<DatePicker
					value={filters.answeredAfter}
					onChange={(d) => setFilter("answeredAfter", d)}
				/>
			</div>
		</div>
	);
}
