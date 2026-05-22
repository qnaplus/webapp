import type { Question } from "@qnaplus/scraper";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cleanQuestionHtml } from "../../lib/sanitize";
import QuestionDetails from "./QuestionDetails";
import QuestionFooter from "./QuestionFooter";
import { cn } from "../../lib/utils";

type Props = {
	question: Question;
	className?: string;
};

export default function QuestionView({ question, className }: Props) {
	const questionHtml = cleanQuestionHtml(question.questionRaw);
	const answerHtml = cleanQuestionHtml(question.answerRaw);

	return (
		<div className={cn("py-4 px-6", className)}>
			<Alert className="mb-3 bg-black/15">
				<IconInfoCircleFilled />
				<AlertTitle>
					qnaplus is an unofficial third-party application
				</AlertTitle>
				<AlertDescription>
					<a
						href={question.url}
						target="_blank"
						rel="noreferrer"
						className="underline"
					>
						Visit the Q&A on RobotEvents
					</a>{" "}
					to get the most up-to-date information.
				</AlertDescription>
			</Alert>

			<h2 className="text-2xl font-semibold mb-1">{question.title}</h2>
			<QuestionDetails question={question} />
			<Separator className="my-3" />

			<div className="px-0 pb-3">
				<h3 className="text-xl font-semibold mb-2">Question</h3>
				<div
					className="prose prose-zinc dark:prose-invert wrap-break-word max-w-none"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html
					dangerouslySetInnerHTML={{ __html: questionHtml }}
				/>
			</div>

			{question.answered && (
				<div className="p-5 border rounded-md border-green-500/40 dark:bg-green-900/10 bg-green-900/20 ">
					<h3 className="text-xl font-semibold mb-2">Answer</h3>
					<div
						className="prose prose-zinc dark:prose-invert wrap-break-word max-w-none"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html
						dangerouslySetInnerHTML={{ __html: answerHtml }}
					/>
				</div>
			)}

			<QuestionFooter question={question} />
		</div>
	);
}
