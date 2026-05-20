import type { Question } from "@qnaplus/scraper";
import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import Root from "../components/layout/Root";
import LoadingQuestion from "../components/question/LoadingQuestion";
import QuestionView from "../components/question/QuestionView";
import { getQuestion } from "../database";

export default function QuestionPage() {
	const [, params] = useRoute("/:id");
	const id = params?.id;

	const [question, setQuestion] = useState<Question | null | undefined>(undefined);

	useEffect(() => {
		if (id === undefined) return;
		let cancelled = false;
		void (async () => {
			const q = await getQuestion(id);
			if (!cancelled) {
				setQuestion(q ?? null);
			}
		})();
		return () => {
			cancelled = true;
		};
	}, [id]);

	return (
		<Root>
			<div className="p-4">
				{question === undefined ? (
					<LoadingQuestion />
				) : question === null ? (
					<div className="flex flex-col items-center justify-center gap-2">
						<h2 className="text-2xl font-semibold">uhhhhhhhhhh...</h2>
						<h4 className="text-base">Couldn't find a question here.</h4>
					</div>
				) : (
					<QuestionView question={question} />
				)}
			</div>
		</Root>
	);
}
