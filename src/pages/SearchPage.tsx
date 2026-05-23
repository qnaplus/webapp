import { useState } from "react";
import type { Question } from "@qnaplus/scraper";
import { IconFilter } from "@tabler/icons-react";
import Root from "@/components/layout/Root";
import LoadingQuestion from "@/components/question/LoadingQuestion";
import FilterPanel from "@/components/search/FilterPanel";
import NoResults from "@/components/search/NoResults";
import QuestionDrawer from "@/components/search/QuestionDrawer";
import QuestionList from "@/components/search/QuestionList";
import QuestionListHeader from "@/components/search/QuestionListHeader";
import ScrollToTop from "@/components/search/ScrollToTop";
import SearchInput from "@/components/search/SearchInput";
import SearchOptions from "@/components/search/SearchOptions";
import BasicSort from "@/components/search/filters/BasicSort";
import SortOrderToggle from "@/components/search/filters/SortOrderToggle";
import { Button } from "@/components/ui/button";
import { useFilteredQuestions } from "@/hooks/useFilteredQuestions";
import { usePageTitle } from "../hooks/usePageTitle";

export default function SearchPage() {
	const { questions, loading } = useFilteredQuestions();
	const [filtersOpen, setFiltersOpen] = useState(false);
    usePageTitle("Search");

	return (
		<Root className="p-0!">
			<div
				className="grid gap-4 p-4 pt-20 grid-cols-1 md:grid-cols-[1fr_4fr] lg:grid-cols-[1fr_4fr_1fr]"
				style={{ minHeight: "calc(100svh - 60px)" }}
			>
				<aside className="hidden md:block">
					<div className="sticky top-20 max-h-[calc(100svh-6rem)] overflow-hidden rounded-lg border bg-popover text-popover-foreground">
						<FilterPanel />
					</div>
				</aside>

				<main className="flex flex-col gap-3 min-w-0">
					<QuestionListHeader results={questions.length} />
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setFiltersOpen((o) => !o)}
							aria-label="Toggle filters"
							className="md:hidden"
						>
							<IconFilter size={16} />
						</Button>
						<SearchInput />
						<BasicSort />
						<SortOrderToggle />
					</div>
					{loading ? (
						<LoadingQuestion />
					) : questions.length === 0 ? (
						<NoResults />
					) : (
						<QuestionList questions={questions as Question[]} />
					)}
				</main>

				<div className="hidden lg:block" aria-hidden="true" />
			</div>
			<div className="md:hidden">
				<SearchOptions open={filtersOpen} onOpenChange={setFiltersOpen} />
			</div>
			<QuestionDrawer />
			<ScrollToTop />
		</Root>
	);
}
