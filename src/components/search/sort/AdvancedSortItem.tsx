import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, ListBox, Select } from "@heroui/react";
import { IconGripVertical, IconX } from "@tabler/icons-react";
import type { Key } from "react";
import {
    type AdvancedSortOption,
    SortOrder,
    sortOrderList,
    useSortStore,
} from "../../../stores/sort";

type Props = {
	index: number;
	option: AdvancedSortOption;
};

export default function AdvancedSortItem({ index, option }: Props) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
		useSortable({ id: String(option.value) });

	const setAdvancedAsc = useSortStore((s) => s.setAdvancedAsc);
	const removeAdvanced = useSortStore((s) => s.removeAdvanced);

	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
		touchAction: "none",
	};

	const handleSelectionChange = (key: Key | null) => {
		if (key === null) return;
		const v = Number(key) as SortOrder;
		const next = sortOrderList.find((o) => o.value === v);
		if (next) setAdvancedAsc(index, next);
	};

	return (
		<div ref={setNodeRef} style={style} className="border rounded-md p-2">
			<div className="flex items-center gap-2">
				<div
					{...attributes}
					{...listeners}
					className="cursor-grab active:cursor-grabbing p-1 flex items-center justify-center"
				>
					<IconGripVertical size={16} />
				</div>

				<span className="flex-1">{option.name}</span>

				<Select.Root
					selectedKey={String(option.asc.value)}
					onSelectionChange={handleSelectionChange}
					className="min-w-35"
				>
					<Select.Trigger>
						<Select.Value />
						<Select.Indicator />
					</Select.Trigger>
					<Select.Popover>
						<ListBox>
							{sortOrderList.map((o) => (
								<ListBox.Item key={o.value} id={String(o.value)}>
									{o.name}
								</ListBox.Item>
							))}
						</ListBox>
					</Select.Popover>
				</Select.Root>

				<Button
					isIconOnly
					size="sm"
					variant="outline"
					aria-label="Remove sort"
					onPress={() => removeAdvanced(index)}
				>
					<IconX size={14} />
				</Button>
			</div>
		</div>
	);
}
