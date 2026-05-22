import { useMemo, useState } from "react";
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
import { getTagSuggestions } from "@/lib/minisearch";
import { useFilterStore } from "@/stores/filters";

export default function TagsFilter() {
	const tags = useFilterStore((s) => s.filters.tags);
	const setFilter = useFilterStore((s) => s.setFilter);

	const [tagInput, setTagInput] = useState("");

	const tagSuggestions = useMemo(
		() => getTagSuggestions(tagInput === "" ? undefined : tagInput),
		[tagInput],
	);

	const anchor = useComboboxAnchor();

	return (
		<div className="flex flex-col gap-1">
			<Label className="text-sm text-muted-foreground" htmlFor="tags-filter">Tags</Label>
			<Combobox<string, true>
				multiple
				items={tagSuggestions}
				value={tags}
				onValueChange={(tags) => {
					setFilter("tags", tags);
					setTagInput("");
				}}
				inputValue={tagInput}
				onInputValueChange={setTagInput}
				filter={null}
			>
				<ComboboxChips ref={anchor}>
					<ComboboxValue>
						{(values: string[]) =>
							values.map((v) => (
								<ComboboxChip key={v}>{v}</ComboboxChip>
							))
						}
					</ComboboxValue>
					<ComboboxChipsInput id="tags-filter" placeholder="Add a tag…" />
				</ComboboxChips>
				<ComboboxContent anchor={anchor}>
					<ComboboxEmpty>No matches</ComboboxEmpty>
					<ComboboxList>
						{tagSuggestions.map((t) => (
							<ComboboxItem key={t} value={t}>
								{t}
							</ComboboxItem>
						))}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</div>
	);
}
