import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IconGripVertical, IconX } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type AdvancedSortOption,
	type SortOrder,
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

	const handleSelectionChange = (value: string | null) => {
		if (value === null) return;
		const v = Number(value) as SortOrder;
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

				<Select
					value={String(option.asc.value)}
					onValueChange={handleSelectionChange}
				>
					<SelectTrigger className="min-w-35">
						<SelectValue>{option.asc.name}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{sortOrderList.map((o) => (
							<SelectItem key={o.value} value={String(o.value)}>
								{o.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Button
					size="icon"
					variant="outline"
					aria-label="Remove sort"
					onClick={() => removeAdvanced(index)}
				>
					<IconX size={14} />
				</Button>
			</div>
		</div>
	);
}
