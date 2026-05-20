import { Button, Card, Separator } from "@heroui/react";
import type { Question } from "@qnaplus/scraper";
import { cleanQuestionHtml } from "../../lib/sanitize";
import { useSearchStore } from "../../stores/search";
import QuestionDetails from "../question/QuestionDetails";
import QuestionTags from "../question/QuestionTags";

type Props = {
	question: Question;
};

const FADE_MASK =
	"linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)";

export default function QuestionCard({ question }: Props) {
	const openQuestion = useSearchStore((s) => s.openQuestion);
	const questionHtml = cleanQuestionHtml(question.questionRaw);

	return (
		<Card.Root className="border flex flex-col">
			<Card.Header>
				<div className="font-medium text-lg">{question.title}</div>
				<QuestionDetails question={question} />
			</Card.Header>
			<Card.Content
				className="prose prose-full max-h-90 overflow-hidden"
				style={{
					WebkitMaskImage: FADE_MASK,
					maskImage: FADE_MASK,
				}}
			>
				<div
					// biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html
					dangerouslySetInnerHTML={{ __html: questionHtml }}
				/>
			</Card.Content>
			<Card.Footer className="flex flex-col items-stretch gap-2">
				<Button
					size="sm"
					variant="outline"
					className="self-start"
					onPress={() => openQuestion(question)}
				>
					Read More
				</Button>
				<Separator />
				<QuestionTags tags={question.tags} program={question.program} />
			</Card.Footer>
		</Card.Root>
	);
}
