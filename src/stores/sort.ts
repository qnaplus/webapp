import { create } from "zustand";
import type { Option } from "./types";

export enum SortOptions {
	Season = 0,
	Author = 1,
	QuestionState = 2,
	AskDate = 3,
	AnswerDate = 4,
}

export enum SortOrder {
	Ascending = 0,
	Descending = 1,
}

export type AdvancedSortOption = Option<SortOptions> & {
	asc: Option<SortOrder>;
};

export type SearchSortOptions = {
	basic: {
		sort: Option<SortOptions>;
		asc: Option<SortOrder>;
	};
	advanced: AdvancedSortOption[];
	advancedEnabled: boolean;
};

export const sortOrderList: Option<SortOrder>[] = [
	{ name: "Ascending", value: SortOrder.Ascending },
	{ name: "Descending", value: SortOrder.Descending },
];

export const sortOptionsList: Option<SortOptions>[] = [
	{ name: "Ask Date", value: SortOptions.AskDate },
	{ name: "Answer Date", value: SortOptions.AnswerDate },
	{ name: "Season", value: SortOptions.Season },
	{ name: "Author", value: SortOptions.Author },
	{ name: "Question State", value: SortOptions.QuestionState },
];

const getInitialSort = (): SearchSortOptions => ({
	basic: {
		sort: { name: "Ask Date", value: SortOptions.AskDate },
		asc: { name: "Descending", value: SortOrder.Descending },
	},
	advanced: [],
	advancedEnabled: false,
});

type SortStore = {
	sort: SearchSortOptions;
	setBasicSort: (sort: Option<SortOptions>) => void;
	setBasicAsc: (asc: Option<SortOrder>) => void;
	toggleAdvanced: (enabled: boolean) => void;
	addAdvanced: (option: Option<SortOptions>) => void;
	removeAdvanced: (index: number) => void;
	setAdvancedAsc: (index: number, asc: Option<SortOrder>) => void;
	reorderAdvanced: (from: number, to: number) => void;
};

export const useSortStore = create<SortStore>((set) => ({
	sort: getInitialSort(),
	setBasicSort: (sortOption) =>
		set((s) => ({ sort: { ...s.sort, basic: { ...s.sort.basic, sort: sortOption } } })),
	setBasicAsc: (asc) =>
		set((s) => ({ sort: { ...s.sort, basic: { ...s.sort.basic, asc } } })),
	toggleAdvanced: (advancedEnabled) =>
		set((s) => ({ sort: { ...s.sort, advancedEnabled } })),
	addAdvanced: (option) =>
		set((s) => ({
			sort: {
				...s.sort,
				advanced: [...s.sort.advanced, { ...option, asc: sortOrderList[0] }],
			},
		})),
	removeAdvanced: (index) =>
		set((s) => ({
			sort: {
				...s.sort,
				advanced: s.sort.advanced.filter((_, i) => i !== index),
			},
		})),
	setAdvancedAsc: (index, asc) =>
		set((s) => ({
			sort: {
				...s.sort,
				advanced: s.sort.advanced.map((opt, i) =>
					i === index ? { ...opt, asc } : opt,
				),
			},
		})),
	reorderAdvanced: (from, to) =>
		set((s) => {
			const next = [...s.sort.advanced];
			const [moved] = next.splice(from, 1);
			next.splice(to, 0, moved);
			return { sort: { ...s.sort, advanced: next } };
		}),
}));
