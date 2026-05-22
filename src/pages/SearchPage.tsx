import type { Question } from "@qnaplus/scraper";
import Root from "@/components/layout/Root";
import LoadingQuestion from "@/components/question/LoadingQuestion";
import NoResults from "@/components/search/NoResults";
import QuestionDrawer from "@/components/search/QuestionDrawer";
import QuestionList from "@/components/search/QuestionList";
import QuestionListHeader from "@/components/search/QuestionListHeader";
import SearchInput from "@/components/search/SearchInput";
import SearchOptions from "@/components/search/SearchOptions";
import { useFilteredQuestions } from "@/hooks/useFilteredQuestions";

export default function SearchPage() {
	const { questions, loading } = useFilteredQuestions();

	return (
		<Root>
			<div className="flex flex-col gap-3 p-4" style={{ height: "calc(100svh - 60px)" }}>
				<div className="flex flex-col gap-3">
					<QuestionListHeader results={questions.length} />
					<SearchInput />
					<SearchOptions />
				</div>
				{loading ? (
					<LoadingQuestion />
				) : questions.length === 0 ? (
					<NoResults />
				) : (
					<QuestionList questions={questions as Question[]} />
				)}
			</div>
			<QuestionDrawer />
		</Root>
	);
}
