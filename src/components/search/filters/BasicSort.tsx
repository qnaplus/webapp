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
	useSortStore,
} from "@/stores/sort";

export default function BasicSort() {
	const sort = useSortStore((s) => s.sort.basic);
	const setBasicSort = useSortStore((s) => s.setBasicSort);

	const handleSortChange = (value: string | null) => {
		if (value === null) return;
		const v = Number(value) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) setBasicSort(next);
	};

	return (
		<Select
			value={String(sort.sort.value)}
			onValueChange={handleSortChange}
		>
			<SelectTrigger className="w-35">
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
	);
}
