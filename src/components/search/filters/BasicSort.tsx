import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	type SortOptions,
	sortOptionsList,
	sortOrderList,
	useSortStore,
} from "../../../stores/sort";

export default function BasicSort() {
	const sort = useSortStore((s) => s.sort.basic);
	const setBasicSort = useSortStore((s) => s.setBasicSort);
	const setBasicAsc = useSortStore((s) => s.setBasicAsc);

	const handleSortChange = (value: string | null) => {
		if (value === null) return;
		const v = Number(value) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) setBasicSort(next);
	};

	const handleOrderChange = (value: string | null) => {
		if (value === null) return;
		const v = Number(value);
		const next = sortOrderList.find((o) => o.value === v);
		if (next) setBasicAsc(next);
	};

	return (
		<div className="flex flex-wrap gap-2">
			<div className="flex flex-col gap-1 flex-1">
				<Label className="text-sm text-muted-foreground">Sort By</Label>
				<Select
					value={String(sort.sort.value)}
					onValueChange={handleSortChange}
				>
					<SelectTrigger>
						<SelectValue>{sort.sort.name}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{sortOptionsList.map((o) => (
							<SelectItem key={o.value} value={String(o.value)}>
								{o.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
			<div className="flex flex-col gap-1 flex-1">
				<Label className="text-sm text-muted-foreground">Order</Label>
				<Select
					value={String(sort.asc.value)}
					onValueChange={handleOrderChange}
				>
					<SelectTrigger>
						<SelectValue>{sort.asc.name}</SelectValue>
					</SelectTrigger>
					<SelectContent>
						{sortOrderList.map((o) => (
							<SelectItem key={o.value} value={String(o.value)}>
								{o.name}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>
		</div>
	);
}
