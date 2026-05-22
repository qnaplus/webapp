import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Question } from "@qnaplus/scraper";
import { KeyboardEvent } from "react";
import { useSearchStore } from "@/stores/search";
import QuestionDetails from "@/components/question/QuestionDetails";
import QuestionTags from "@/components/question/QuestionTags";

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
        <Card
            className="border flex flex-col cursor-pointer transition-colors hover:bg-muted ring-0 focus-visible:outline-2 focus-visible:outline-ring mb-2 w-full"
            onClick={open}
            onKeyDown={onKeyDown}
        >
            <CardHeader>
                <div className="font-medium text-lg">{question.title}</div>
                <QuestionDetails question={question} />
            </CardHeader>
            <CardContent
                className="prose dark:prose-invert max-w-none min-h-40 max-h-40 overflow-hidden w-full"
                style={{
                    WebkitMaskImage: FADE_MASK,
                    maskImage: FADE_MASK,
                }}
            >
                    <div
                        // biome-ignore lint/security/noDangerouslySetInnerHtml: sanitized via sanitize-html during minisearch load
                        dangerouslySetInnerHTML={{ __html: question.questionRaw }}
                    />
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
                <QuestionTags tags={question.tags} program={question.program} />
            </CardFooter>
        </Card>
    );
}
