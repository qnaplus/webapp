import {
	Combobox,
	ComboboxChip,
	ComboboxChips,
	ComboboxChipsInput,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxItem,
	ComboboxList,
	ComboboxValue,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { useAppDataStore } from "../../../stores/appData";
import { useFilterStore } from "../../../stores/filters";

export default function ProgramFilter() {
	const programs = useAppDataStore((s) => s.programs);
	const programFilter = useFilterStore((s) => s.filters.program);
	const setFilter = useFilterStore((s) => s.setFilter);

	const selected = programFilter.map((p) => p.value);

	const onChange = (values: string[]) => {
		setFilter(
			"program",
			values.map((v) => ({ name: v, value: v })),
		);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-50">
			<Label className="text-sm text-muted-foreground">Program</Label>
			<Combobox<string, true>
				multiple
				items={programs}
				value={selected}
				onValueChange={onChange}
			>
				<ComboboxChips>
					<ComboboxValue>
						{(values: string[]) =>
							values.map((v) => (
								<ComboboxChip key={v}>{v}</ComboboxChip>
							))
						}
					</ComboboxValue>
					<ComboboxChipsInput placeholder="Program" />
				</ComboboxChips>
				<ComboboxContent>
					<ComboboxEmpty>No programs</ComboboxEmpty>
					<ComboboxList>
						{programs.map((p) => (
							<ComboboxItem key={p} value={p}>
								{p}
							</ComboboxItem>
						))}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</div>
	);
}
