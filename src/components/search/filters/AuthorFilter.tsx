import { useEffect, useMemo, useState } from "react";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import { Label } from "@/components/ui/label";
import { getAuthorSuggestions } from "@/lib/minisearch";
import { isEmptyFilterValue, useFilterStore } from "@/stores/filters";

export default function AuthorFilter() {
	const author = useFilterStore((s) => s.filters.author);
	const setFilter = useFilterStore((s) => s.setFilter);

	const [authorInput, setAuthorInput] = useState(author ?? "");

	const authorSuggestions = useMemo(
		() => getAuthorSuggestions(authorInput === "" ? null : authorInput),
		[authorInput],
	);

	useEffect(() => {
		if (isEmptyFilterValue(author)) {
			setAuthorInput("");
		}
	}, [author]);

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-42">
			<Label className="text-sm text-muted-foreground" htmlFor="author-filter">Author</Label>
			<Combobox
				items={authorSuggestions}
				value={author ?? null}
				onValueChange={(value) => {
					const v = value ?? null;
					setFilter("author", v);
					setAuthorInput(v ?? "");
				}}
				inputValue={authorInput}
				onInputValueChange={setAuthorInput}
				filter={null}
			>
				<ComboboxInput id="author-filter" placeholder="Author" />
				<ComboboxContent>
					<ComboboxEmpty>No matches</ComboboxEmpty>
					<ComboboxList>
						{authorSuggestions.map((a) => (
							<ComboboxItem key={a} value={a}>
								{a}
							</ComboboxItem>
						))}
					</ComboboxList>
				</ComboboxContent>
			</Combobox>
		</div>
	);
}
