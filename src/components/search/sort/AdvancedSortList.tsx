import {
	DndContext,
	type DragEndEvent,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useSortStore } from "../../../stores/sort";
import AdvancedSortItem from "./AdvancedSortItem";

export default function AdvancedSortList() {
	const advanced = useSortStore((s) => s.sort.advanced);
	const reorderAdvanced = useSortStore((s) => s.reorderAdvanced);
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
	);

	if (advanced.length === 0) {
		return (
			<p className="text-sm text-muted">No sort criteria selected.</p>
		);
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over === null || active.id === over.id) return;
		const from = advanced.findIndex((o) => String(o.value) === active.id);
		const to = advanced.findIndex((o) => String(o.value) === over.id);
		if (from === -1 || to === -1) return;
		reorderAdvanced(from, to);
	};

	return (
		<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
			<SortableContext
				items={advanced.map((o) => String(o.value))}
				strategy={verticalListSortingStrategy}
			>
				<div className="flex flex-col gap-2">
					{advanced.map((option, index) => (
						<AdvancedSortItem key={String(option.value)} index={index} option={option} />
					))}
				</div>
			</SortableContext>
		</DndContext>
	);
}
