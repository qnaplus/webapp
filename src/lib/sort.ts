import type { Question } from "@qnaplus/scraper";
import {
	type SearchSortOptions,
	SortOptions,
	SortOrder,
} from "../stores/sort";
import { type SortFunction, multisortrules } from "../util/sorting";
import type { UseSearchResult } from "./minisearch";

type SortMap<T> = {
	[K in SortOptions]: SortFunction<T>;
};

const SORT_MAP: SortMap<Question> = {
	[SortOptions.Season]: (a, b) =>
		Number.parseInt(b.season.split("-")[1]) -
		Number.parseInt(a.season.split("-")[1]),
	[SortOptions.Author]: (a, b) => b.author.localeCompare(a.author),
	[SortOptions.QuestionState]: (a, b) => +b.answered - +a.answered,
	[SortOptions.AskDate]: (a, b) =>
		Number.parseInt(b.id) -
		Number.parseInt(a.id) +
		(b.answeredTimestampMs ?? 0) -
		(a.answeredTimestampMs ?? 0),
	[SortOptions.AnswerDate]: (a, b) =>
		Number.parseInt(b.id) -
		Number.parseInt(a.id) +
		(b.answeredTimestampMs ?? 0) -
		(a.answeredTimestampMs ?? 0),
};

export const applySort = (
	questions: UseSearchResult[],
	sort: SearchSortOptions,
): UseSearchResult[] => {
	const copy = [...questions] as Question[];
	if (sort.advancedEnabled) {
		const rules = sort.advanced.map((s) => ({
			sort: SORT_MAP[s.value],
			asc: s.asc.value === SortOrder.Ascending,
		}));
		return multisortrules(copy, rules);
	}
	const fn = SORT_MAP[sort.basic.sort.value];
	copy.sort((a, b) =>
		sort.basic.asc.value === SortOrder.Ascending ? fn(b, a) : fn(a, b),
	);
	return copy;
};
