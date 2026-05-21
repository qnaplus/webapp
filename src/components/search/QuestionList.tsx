import type { Question } from "@qnaplus/scraper";
import { List, type RowComponentProps, useDynamicRowHeight } from "react-window";
import QuestionCard from "./QuestionCard";

type Props = {
	questions: Question[];
};

type RowProps = {
	questions: Question[];
};

const Row = ({ index, style, questions }: RowComponentProps<RowProps>) => {
	const question = questions[index];
	return (
		<div style={style}>
			<div className="pr-2 pb-3">
				<QuestionCard question={question} />
			</div>
		</div>
	);
};

export default function QuestionList({ questions }: Props) {
    // TODO: retry virtua
	return (
		<div className="flex-1 min-h-0 w-full">
			<List
				rowComponent={Row}
				rowCount={questions.length}
				rowHeight={172}
				rowProps={{ questions }}
				overscanCount={3}
				// style={{ height: "100%" }}
			/>
		</div>
	);
}
