import type { Question } from "@qnaplus/scraper";
import { IconCheck } from "@tabler/icons-react";
import { isEmpty } from "@/util/strings";

type Props = {
	question: Question;
};

export default function QuestionDetails({ question }: Props) {
	const answeredLabel = question.answered ? "Answered" : "Unanswered";
	return (
		<div className="flex flex-col xl:flex-row items-start xl:items-center justify-between text-base">
			<div className="flex flex-wrap items-center gap-2 text-muted-foreground">
				{!isEmpty(question.author) && <span>{question.author}</span>}
				{!isEmpty(question.askedTimestamp) && (
					<>
						<span>·</span>
						<span>{question.askedTimestamp}</span>
					</>
				)}
			</div>
			<div className="flex items-center gap-1.5">
				{question.answered ? (
					<span className="inline-flex items-center gap-1 dark:text-green-400 dark:bg-green-500/10 bg-green-700/40 text-green-800 px-1.5 py-0.5 rounded-md">
						<IconCheck size={14} />
						<span>{answeredLabel}</span>
					</span>
				) : (
					<span className="text-sm text-muted-foreground">{answeredLabel}</span>
				)}
			</div>
		</div>
	);
}
