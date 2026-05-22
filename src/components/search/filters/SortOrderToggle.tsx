import { IconSortAscending, IconSortDescending } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { SortOrder, sortOrderList, useSortStore } from "@/stores/sort";

export default function SortOrderToggle() {
    const asc = useSortStore((s) => s.sort.basic.asc);
    const setBasicAsc = useSortStore((s) => s.setBasicAsc);

    const isAscending = asc.value === SortOrder.Ascending;

    const toggle = () => {
        const next = isAscending
            ? sortOrderList.find((o) => o.value === SortOrder.Descending)!
            : sortOrderList.find((o) => o.value === SortOrder.Ascending)!;
        setBasicAsc(next);
    };

    return (
        <Tooltip>
            <TooltipTrigger
                render={
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={toggle}
                        aria-label={isAscending ? "Ascending order" : "Descending order"}
                    />
                }
            >
                {isAscending ? (
                    <IconSortAscending size={16} />
                ) : (
                    <IconSortDescending size={16} />
                )}
            </TooltipTrigger>
            <TooltipContent>
                {isAscending ? "Ascending" : "Descending"}
            </TooltipContent>
        </Tooltip>
    );
}
