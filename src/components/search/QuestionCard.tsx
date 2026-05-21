import { Card, Separator } from "@heroui/react";
import type { Question } from "@qnaplus/scraper";
import { KeyboardEvent } from "react";
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
    const open = () => openQuestion(question);
    const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            open();
        }
    };
    return (
        <Card.Root
            className="border flex flex-col cursor-pointer transition-colors hover:bg-surface-secondary focus-visible:outline-2 focus-visible:outline-accent mb-2"
            onClick={open}
            onKeyDown={onKeyDown}
        >
            <Card.Header>
                <div className="font-medium text-lg">{question.title}</div>
                <QuestionDetails question={question} />
            </Card.Header>
            <Card.Content
                className="prose prose-full min-h-40 max-h-40 overflow-hidden"
                style={{
                    WebkitMaskImage: FADE_MASK,
                    maskImage: FADE_MASK,
                }}
            >
                <div
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html during minisearch load
                    dangerouslySetInnerHTML={{ __html: question.questionRaw }}
                />
            </Card.Content>
            <Card.Footer className="flex flex-col items-stretch gap-2">
                <Separator />
                <QuestionTags tags={question.tags} program={question.program} />
            </Card.Footer>
        </Card.Root>
    );
}
