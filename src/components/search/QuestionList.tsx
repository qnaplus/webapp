import type { Question } from "@qnaplus/scraper";
import { WindowVirtualizer } from "virtua";
import QuestionCard from "./QuestionCard";

type Props = {
	questions: Question[];
};

export default function QuestionList({ questions }: Props) {
	return (
		<WindowVirtualizer data={questions}>
			{(question) => {
				return <QuestionCard question={question} />
			}}
		</WindowVirtualizer>
	);
}
