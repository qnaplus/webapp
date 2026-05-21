import { useLiveQuery } from "dexie-react-hooks";
import { useMemo } from "react";
import { database } from "../database";
import { applyFilters } from "../lib/filter";
import { applyHints } from "../lib/highlight";
import { type UseSearchResult, runMinisearch } from "../lib/minisearch";
import { applySort } from "../lib/sort";
import { useFilterStore } from "../stores/filters";
import { useSearchStore } from "../stores/search";
import { useSortStore } from "../stores/sort";

export const useFilteredQuestions = (): {
	questions: UseSearchResult[];
	loading: boolean;
} => {
    console.time("query")
	const dbQuestions = useLiveQuery(() => database.questions.toArray(), []);
	const query = useSearchStore((s) => s.query);
	const filters = useFilterStore((s) => s.filters);
	const sort = useSortStore((s) => s.sort);

	const searched = useMemo(
		() => runMinisearch(query, dbQuestions),
		[query, dbQuestions],
	);
	const filtered = useMemo(
		() => applyFilters(searched, filters),
		[searched, filters],
	);
	const highlighted = useMemo(() => applyHints(filtered), [filtered]);
	const sorted = useMemo(() => applySort(highlighted, sort), [highlighted, sort]);
    console.timeEnd("query")
    console.log(sorted)
	return { questions: sorted, loading: dbQuestions === undefined };
};
