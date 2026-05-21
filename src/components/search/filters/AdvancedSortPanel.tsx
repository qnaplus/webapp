import { useMemo } from "react";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
	type SortOptions,
	sortOptionsList,
	useSortStore,
} from "../../../stores/sort";
import AdvancedSortList from "../sort/AdvancedSortList";

export default function AdvancedSortPanel() {
	const sort = useSortStore((s) => s.sort);
	const toggleAdvanced = useSortStore((s) => s.toggleAdvanced);
	const addAdvanced = useSortStore((s) => s.addAdvanced);

	const remainingAdvanced = useMemo(
		() => sortOptionsList.filter((o) => !sort.advanced.find((s) => s.value === o.value)),
		[sort.advanced],
	);

	const handleAddAdvanced = (value: string | null) => {
		if (value === null) return;
		const v = Number(value) as SortOptions;
		const next = sortOptionsList.find((o) => o.value === v);
		if (next) addAdvanced(next);
	};

	return (
		<div className="flex flex-col gap-3">
			<div className="flex items-center justify-end gap-2">
				<Label htmlFor="advanced-sorting" className="text-sm text-muted-foreground">
					Advanced Sorting
				</Label>
				<Switch
					id="advanced-sorting"
					checked={sort.advancedEnabled}
					onCheckedChange={toggleAdvanced}
				/>
			</div>

			{sort.advancedEnabled && (
				<>
					<div className="flex flex-col gap-1">
						<Label className="text-sm text-muted-foreground">Add Sort Option</Label>
						<Select value={null} onValueChange={handleAddAdvanced}>
							<SelectTrigger>
								<SelectValue placeholder="Add…" />
							</SelectTrigger>
							<SelectContent>
								{remainingAdvanced.map((o) => (
									<SelectItem key={o.value} value={String(o.value)}>
										{o.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<AdvancedSortList />
				</>
			)}
		</div>
	);
}
