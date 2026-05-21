import { Button, ComboBox, Input, Label, ListBox } from "@heroui/react";
import type { Key } from "react";
import { useMemo, useState } from "react";
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

	const handleTagSelected = (key: Key | null) => {
		if (key === null) return;
		const v = String(key);
		if (tags.includes(v)) return;
		setFilter("tags", [...tags, v]);
		setTagInput("");
	};

	const removeTag = (tag: string) =>
		setFilter("tags", tags.filter((t) => t !== tag));

	return (
		<div className="flex flex-col gap-1">
			<Label className="text-sm text-muted">Tags</Label>
			<ComboBox
				inputValue={tagInput}
				onInputChange={setTagInput}
				onSelectionChange={handleTagSelected}
			>
				<ComboBox.InputGroup>
					<Input placeholder="Add a tag…" />
					<ComboBox.Trigger />
				</ComboBox.InputGroup>
				<ComboBox.Popover>
					<ListBox>
						{tagSuggestions.map((t) => (
							<ListBox.Item key={t} id={t}>
								{t}
							</ListBox.Item>
						))}
					</ListBox>
				</ComboBox.Popover>
			</ComboBox>
			{tags.length > 0 && (
				<div className="flex flex-wrap gap-2 mt-2">
					{tags.map((tag) => (
						<Button
							key={tag}
							size="sm"
							variant="outline"
							onPress={() => removeTag(tag)}
						>
							{tag} ✕
						</Button>
					))}
				</div>
			)}
		</div>
	);
}
