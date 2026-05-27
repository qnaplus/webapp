import type { Question } from "@qnaplus/scraper";
import {
	QuestionStateValue,
	type SearchFilters,
	isEmptyFilterValue,
} from "@/stores/filters";
import type { UseSearchResult } from "./minisearch";

type FilterMap = {
	[K in keyof SearchFilters]: (
		question: Question,
		filters: SearchFilters,
	) => boolean;
};

const FILTER_MAP: FilterMap = {
	season(q, f) {
		return f.season.find((s) => s.value === q.season) !== undefined;
	},
	program(q, f) {
		return f.program.find((p) => p.value === q.program) !== undefined;
	},
	author(q, f) {
		return q.author.includes(f.author ?? "");
	},
	state(q, f) {
		if (f.state.value === QuestionStateValue.All) {
			return true;
		}
		return f.state.value === QuestionStateValue.Answered
			? q.answered
			: !q.answered;
	},
	askedBefore(q, f) {
		if (q.askedTimestampMs === null || f.askedBefore === null) {
			return false;
		}
		return new Date(q.askedTimestampMs) < f.askedBefore;
	},
	askedAfter(q, f) {
		if (q.askedTimestampMs === null || f.askedAfter === null) {
			return false;
		}
		return new Date(q.askedTimestampMs) > f.askedAfter;
	},
	answeredBefore(q, f) {
		if (q.askedTimestampMs === null || f.answeredBefore === null) {
			return false;
		}
		return new Date(q.askedTimestampMs) < f.answeredBefore;
	},
	answeredAfter(q, f) {
		if (q.askedTimestampMs === null || f.answeredAfter === null) {
			return false;
		}
		return new Date(q.askedTimestampMs) > f.answeredAfter;
	},
	tags(q, f) {
		return f.tags.every((t) => q.tags.includes(t));
	},
};

export const applyFilters = (
	questions: UseSearchResult[],
	filters: SearchFilters,
): UseSearchResult[] => {
	const keys = Object.keys(filters) as Array<keyof SearchFilters>;
	const applicableFilters = keys
		.filter((k) => !isEmptyFilterValue(filters[k]))
		.map((k) => FILTER_MAP[k]);
	return questions.filter((q) => applicableFilters.every((f) => f(q, filters)));
};
