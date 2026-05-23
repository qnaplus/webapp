import type { Question } from "@qnaplus/scraper";
import { create } from "zustand";

type SearchStore = {
	query: string;
	selectedQuestion: Question | undefined;
	setQuery: (query: string) => void;
	openQuestion: (question: Question) => void;
	closeDrawer: () => void;
};

export const useSearchStore = create<SearchStore>((set) => ({
	query: "",
	selectedQuestion: undefined,
	setQuery: (query) => set({ query }),
	openQuestion: (question) => set({ selectedQuestion: question }),
	closeDrawer: () => set({ selectedQuestion: undefined }),
}));
