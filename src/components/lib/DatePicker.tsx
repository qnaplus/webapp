import { IconCalendar } from "@tabler/icons-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

type DatePickerProps = {
	value: Date | null;
	onChange: (date: Date | null) => void;
	placeholder?: string;
};

export default function DatePicker({
	value,
	onChange,
	placeholder = "Pick a date",
}: DatePickerProps) {
	return (
		<Popover>
			<PopoverTrigger
				render={
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start font-normal",
							value === null && "text-muted-foreground",
						)}
					>
						<IconCalendar />
						{value !== null ? format(value, "PPP") : placeholder}
					</Button>
				}
			/>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value ?? undefined}
					onSelect={(d) => onChange(d ?? null)}
				/>
			</PopoverContent>
		</Popover>
	);
}
