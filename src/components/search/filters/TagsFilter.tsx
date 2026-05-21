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
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { getTagSuggestions } from "../../../lib/minisearch";
import { useFilterStore } from "../../../stores/filters";

export default function TagsFilter() {
	const tags = useFilterStore((s) => s.filters.tags);
	const setFilter = useFilterStore((s) => s.setFilter);

	const [tagInput, setTagInput] = useState("");

	const tagSuggestions = useMemo(
		() => getTagSuggestions(tagInput === "" ? undefined : tagInput),
		[tagInput],
	);

	const onChange = (next: string[]) => {
		setFilter("tags", next);
		setTagInput("");
	};

	return (
		<div className="flex flex-col gap-1">
			<Label className="text-sm text-muted-foreground">Tags</Label>
			<Combobox<string, true>
				multiple
				items={tagSuggestions}
				value={tags}
				onValueChange={onChange}
				inputValue={tagInput}
				onInputValueChange={setTagInput}
				filter={null}
			>
				<ComboboxChips>
					<ComboboxValue>
						{(values: string[]) =>
							values.map((v) => (
								<ComboboxChip key={v}>{v}</ComboboxChip>
							))
						}
					</ComboboxValue>
					<ComboboxChipsInput placeholder="Add a tag…" />
				</ComboboxChips>
				<ComboboxContent>
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
