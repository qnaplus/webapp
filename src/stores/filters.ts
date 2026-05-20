import type { Question } from "@qnaplus/scraper";
import { create } from "zustand";
import type { Option } from "./types";

export enum QuestionStateValue {
	All = 0,
	Answered = 1,
	Unanswered = 2,
}

export const questionStateOptions: Option<QuestionStateValue>[] = [
	{ name: "All", value: QuestionStateValue.All },
	{ name: "Answered", value: QuestionStateValue.Answered },
	{ name: "Unanswered", value: QuestionStateValue.Unanswered },
];

export type SearchFilters = {
	season: Option<Question["season"]>[];
	program: Option<Question["program"]>[];
	author: Question["author"] | null;
	state: Option<QuestionStateValue>;
	askedBefore: Date | null;
	askedAfter: Date | null;
	answeredBefore: Date | null;
	answeredAfter: Date | null;
	tags: string[];
};

const getInitialFilters = (): SearchFilters => ({
	season: [],
	program: [],
	author: null,
	state: questionStateOptions[0],
	askedBefore: null,
	askedAfter: null,
	answeredBefore: null,
	answeredAfter: null,
	tags: [],
});

type FilterStore = {
	filters: SearchFilters;
	setFilter: <K extends keyof SearchFilters>(key: K, value: SearchFilters[K]) => void;
	clearFilters: () => void;
};

export const useFilterStore = create<FilterStore>((set) => ({
	filters: getInitialFilters(),
	setFilter: (key, value) =>
		set((s) => ({ filters: { ...s.filters, [key]: value } })),
	clearFilters: () => set({ filters: getInitialFilters() }),
}));

export const isEmptyFilterValue = (
	filterValue: SearchFilters[keyof SearchFilters],
): boolean => {
	if (typeof filterValue === "string") {
		return filterValue.trim() === "";
	}
	if (Array.isArray(filterValue)) {
		return filterValue.length === 0;
	}
	return filterValue === null;
};

export const selectAppliedFilterCount = (filters: SearchFilters): number => {
	const keys = Object.keys(filters) as Array<keyof SearchFilters>;
	const applied = keys.filter((k) => !isEmptyFilterValue(filters[k]));
	return applied.length - (filters.state.value === QuestionStateValue.All ? 1 : 0);
};
