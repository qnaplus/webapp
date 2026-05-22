import { useState } from "react";
import type { Question } from "@qnaplus/scraper";
import { IconFilter } from "@tabler/icons-react";
import Root from "@/components/layout/Root";
import LoadingQuestion from "@/components/question/LoadingQuestion";
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

export default function SearchPage() {
	const { questions, loading } = useFilteredQuestions();
	const [filtersOpen, setFiltersOpen] = useState(false);

	return (
		<Root>
			<div className="flex flex-col gap-3 p-4 pt-20" style={{ height: "calc(100svh - 60px)" }}>
				<div className="flex flex-col gap-3">
					<QuestionListHeader results={questions.length} />
					<div className="flex items-center gap-2">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setFiltersOpen((o) => !o)}
							aria-label="Toggle filters"
						>
							<IconFilter size={16} />
						</Button>
						<SearchInput />
						<BasicSort />
						<SortOrderToggle />
					</div>
				</div>
				{loading ? (
					<LoadingQuestion />
				) : questions.length === 0 ? (
					<NoResults />
				) : (
					<QuestionList questions={questions as Question[]} />
				)}
			</div>
			<SearchOptions open={filtersOpen} onOpenChange={setFiltersOpen} />
			<QuestionDrawer />
			<ScrollToTop />
		</Root>
	);
}
