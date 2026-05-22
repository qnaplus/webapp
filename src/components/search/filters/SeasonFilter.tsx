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
	useComboboxAnchor,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { useAppDataStore } from "@/stores/appData";
import { useFilterStore } from "@/stores/filters";

export default function SeasonFilter() {
	const seasons = useAppDataStore((s) => s.seasons);
	const seasonFilter = useFilterStore((s) => s.filters.season);
	const setFilter = useFilterStore((s) => s.setFilter);

	const selected = seasonFilter.map((s) => s.value);

	const anchor = useComboboxAnchor();

	const onChange = (values: string[]) => {
		setFilter(
			"season",
			values.map((v) => ({ name: v, value: v })),
		);
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-50">
			<Label className="text-sm text-muted-foreground" htmlFor="season-filter">Season</Label>
			<Combobox<string, true>
				multiple
				items={seasons}
				value={selected}
				onValueChange={onChange}
			>
				<ComboboxChips ref={anchor}>
					<ComboboxValue>
						{(values: string[]) =>
							values.map((v) => (
								<ComboboxChip key={v}>{v}</ComboboxChip>
							))
						}
					</ComboboxValue>
					<ComboboxChipsInput id="season-filter" placeholder="Season" />
				</ComboboxChips>
				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>No seasons</ComboboxEmpty>
					<ComboboxList>
						{seasons.map((s) => (
							<ComboboxItem key={s} value={s}>
								{s}
							</ComboboxItem>
						))}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</div>
	);
}
