import { Alert, Separator } from "@heroui/react";
import type { Question } from "@qnaplus/scraper";
import { IconInfoCircleFilled } from "@tabler/icons-react";
import { cleanQuestionHtml } from "../../lib/sanitize";
import QuestionDetails from "./QuestionDetails";
import QuestionFooter from "./QuestionFooter";

type Props = {
	question: Question;
};

export default function QuestionView({ question }: Props) {
	const questionHtml = cleanQuestionHtml(question.questionRaw);
	const answerHtml = cleanQuestionHtml(question.answerRaw);

	return (
		<div className="p-4">
			<Alert status="accent" className="mb-3 bg-black/15">
				<Alert.Indicator>
					<IconInfoCircleFilled size={16} />
				</Alert.Indicator>
				<Alert.Content>
					<Alert.Title>
						qnaplus is an unofficial third-party application.{" "}
					</Alert.Title>
					<Alert.Description>
						<a
							href={question.url}
							target="_blank"
							rel="noreferrer"
							className="underline"
						>
							Visit the Q&A on RobotEvents
						</a>{" "}
						to get the most up-to-date information.
					</Alert.Description>
				</Alert.Content>
			</Alert>

			<h2 className="text-2xl font-semibold mb-1">{question.title}</h2>
			<QuestionDetails question={question} />
			<Separator className="my-3" />

			<div className="px-5 pb-3">
				<h3 className="text-xl font-semibold mb-2">Question</h3>
				<div
					className="prose prose-full text-muted wrap-break-word max-w-none"
					// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html
					dangerouslySetInnerHTML={{ __html: questionHtml }}
				/>
			</div>

			{question.answered && (
				<div
					className="p-5 border rounded-md border-green-500/40 bg-green-900/10"
				>
					<h3 className="text-xl font-semibold mb-2">Answer</h3>
					<div
						className="prose prose-full text-muted wrap-break-word max-w-none"
						// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html
						dangerouslySetInnerHTML={{ __html: answerHtml }}
					/>
				</div>
			)}

			<QuestionFooter question={question} />
		</div>
	);
}
