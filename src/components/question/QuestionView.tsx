import type { Question } from "@qnaplus/scraper";
import { IconEye, IconInfoCircleFilled } from "@tabler/icons-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { cleanQuestionHtml } from "../../lib/sanitize";
import QuestionDetails from "./QuestionDetails";
import QuestionFooter from "./QuestionFooter";
import { cn } from "../../lib/utils";
import parse, { DOMNode, Element } from "html-react-parser";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { AspectRatio } from "../ui/aspect-ratio";

type Props = {
    question: Question;
    className?: string;
};

export default function QuestionView({ question, className }: Props) {
    const questionHtml = cleanQuestionHtml(question.questionRaw);
    const answerHtml = cleanQuestionHtml(question.answerRaw);

    const makeImageReplacer = () => (domNode: DOMNode) => {
        const el = domNode as Element;
        if (el.tagName === "img") {
            return (
                <Dialog>
                    <DialogTrigger>
                        <AspectRatio ratio={16 / 9} className="group overflow-hidden rounded  max-h-60">
                            <img src={el.attribs.src} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
                                <IconEye className="text-white" size={24} />
                                View Full Image
                            </div>
                        </AspectRatio>
                    </DialogTrigger>
                    <DialogContent>
                        <img src={el.attribs.src} />
                    </DialogContent>
                </Dialog>
            );
        }
    };

    const questionContent = parse(questionHtml, { replace: makeImageReplacer() });
    const answerContent = parse(answerHtml, { replace: makeImageReplacer() });

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
                >
                    {questionContent}
                </div>
            </div>

            {question.answered && (
                <div className="p-5 border rounded-md border-green-500/40 dark:bg-green-900/10 bg-green-900/20 ">
                    <h3 className="text-xl font-semibold mb-2">Answer</h3>
                    <div
                        className="prose prose-zinc dark:prose-invert wrap-break-word max-w-none"
                    >
                        {answerContent}
                    </div>
                </div>
            )}

            <QuestionFooter question={question} />
        </div>
    );
}
