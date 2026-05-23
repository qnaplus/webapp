import type { Question } from "@qnaplus/scraper";
import { IconExternalLink } from "@tabler/icons-react";
import QuestionTags from "./QuestionTags";

type Props = {
	question: Question;
};

export default function QuestionFooter({ question }: Props) {
	return (
		<div className="flex flex-col xl:flex-row justify-between gap-3 mt-3">
			<QuestionTags tags={question.tags} program={question.program} />
			<a
				href={question.url}
				target="_blank"
				rel="noreferrer"
				className="inline-flex items-center gap-1 text-muted-foreground no-underline hover:underline"
			>
				<span>View on RobotEvents</span>
				<IconExternalLink size={14} />
			</a>
		</div>
	);
}
