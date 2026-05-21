import { Label } from "@heroui/react";
import {
	type CalendarDate,
	getLocalTimeZone,
	parseDate,
} from "@internationalized/date";
import { useFilterStore } from "../../../stores/filters";
import DatePicker from "../../lib/DatePicker";

const toCalendarDate = (d: Date | null): CalendarDate | null => {
	if (d === null) return null;
	const iso = d.toISOString().slice(0, 10);
	return parseDate(iso);
};

const fromCalendarDate = (d: CalendarDate | null): Date | null => {
	if (d === null) return null;
	return d.toDate(getLocalTimeZone());
};

export default function DateFilters() {
	const filters = useFilterStore((s) => s.filters);
	const setFilter = useFilterStore((s) => s.setFilter);

	return (
		<div className="flex flex-wrap gap-2">
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted">Asked Before</Label>
				<DatePicker
					value={toCalendarDate(filters.askedBefore)}
					onChange={(d) => setFilter("askedBefore", fromCalendarDate(d))}
				/>
			</div>
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted">Asked After</Label>
				<DatePicker
					value={toCalendarDate(filters.askedAfter)}
					onChange={(d) => setFilter("askedAfter", fromCalendarDate(d))}
				/>
			</div>
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted">Answered Before</Label>
				<DatePicker
					value={toCalendarDate(filters.answeredBefore)}
					onChange={(d) => setFilter("answeredBefore", fromCalendarDate(d))}
				/>
			</div>
			<div className="flex flex-col gap-1 flex-1 min-w-37">
				<Label className="text-sm text-muted">Answered After</Label>
				<DatePicker
					value={toCalendarDate(filters.answeredAfter)}
					onChange={(d) => setFilter("answeredAfter", fromCalendarDate(d))}
				/>
			</div>
		</div>
	);
}
