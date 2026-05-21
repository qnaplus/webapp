import { ComboBox, Input, Label, ListBox } from "@heroui/react";
import type { Key } from "react";
import { useMemo, useState } from "react";
import { getAuthorSuggestions } from "../../../lib/minisearch";
import { useFilterStore } from "../../../stores/filters";

export default function AuthorFilter() {
	const author = useFilterStore((s) => s.filters.author);
	const setFilter = useFilterStore((s) => s.setFilter);

	const [authorInput, setAuthorInput] = useState(author ?? "");

	const authorSuggestions = useMemo(
		() => getAuthorSuggestions(authorInput === "" ? null : authorInput),
		[authorInput],
	);

	const handleSelection = (key: Key | null) => {
		const v = key === null ? null : String(key);
		setFilter("author", v);
		setAuthorInput(v ?? "");
	};

	return (
		<div className="flex flex-col gap-1 flex-1 min-w-42">
			<Label className="text-sm text-muted">Author</Label>
			<ComboBox
				inputValue={authorInput}
				onInputChange={setAuthorInput}
				onSelectionChange={handleSelection}
				onBlur={() =>
					setFilter("author", authorInput === "" ? null : authorInput)
				}
			>
				<ComboBox.InputGroup>
					<Input placeholder="Author" />
					<ComboBox.Trigger />
				</ComboBox.InputGroup>
				<ComboBox.Popover>
					<ListBox>
						{authorSuggestions.map((a) => (
							<ListBox.Item key={a} id={a}>
								{a}
							</ListBox.Item>
						))}
					</ListBox>
				</ComboBox.Popover>
			</ComboBox>
		</div>
	);
}
