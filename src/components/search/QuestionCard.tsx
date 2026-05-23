import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import type { Question } from "@qnaplus/scraper";
import { KeyboardEvent, useMemo } from "react";
import { useSearchStore } from "@/stores/search";
import QuestionDetails from "@/components/question/QuestionDetails";
import QuestionTags from "@/components/question/QuestionTags";
import { truncateHtml } from "@/lib/truncate";
import parse, { Element } from "html-react-parser";
import { AspectRatio } from "../ui/aspect-ratio";

type Props = {
    question: Question;
};

const FADE_MASK =
    "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)";

export default function QuestionCard({ question }: Props) {
    const openQuestion = useSearchStore((s) => s.openQuestion);
    const open = () => openQuestion(question);
    const content = useMemo(
        () => {
            const truncated = truncateHtml(question.questionRaw, 300);
            return parse(truncated, {
                replace(domNode) {
                    const el = domNode as Element;
                    if (el.tagName === "img") {
                        return (
                            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded">
                                <img src={el.attribs.src} className="w-full h-full object-cover" />
                            </AspectRatio>
                        );
                    }
                },
            })
        },
        [question.questionRaw],
    );
    return (
        <Card
            className="border flex flex-col cursor-pointer transition-colors hover:bg-muted ring-0 focus-visible:outline-2 focus-visible:outline-ring mb-4 w-full"
            onClick={open}
            onKeyDown={(e: KeyboardEvent<HTMLDivElement>) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    open();
                }
            }}
        >
            <CardHeader>
                <div className="font-medium text-lg">{question.title}</div>
                <QuestionDetails question={question} />
            </CardHeader>
            <CardContent
                className="prose dark:prose-invert max-w-none max-h-40 overflow-hidden w-full"
                style={{
                    WebkitMaskImage: FADE_MASK,
                    maskImage: FADE_MASK,
                }}
            >
                {content}
            </CardContent>
            <CardFooter className="flex flex-col items-stretch gap-2">
                <QuestionTags tags={question.tags} program={question.program} />
            </CardFooter>
        </Card>
    );
}
