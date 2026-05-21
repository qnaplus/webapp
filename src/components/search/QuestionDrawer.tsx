import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetTitle,
} from "@/components/ui/sheet";
import { useSearchStore } from "../../stores/search";
import QuestionView from "../question/QuestionView";

export default function QuestionDrawer() {
	const selectedQuestion = useSearchStore((s) => s.selectedQuestion);
	const closeDrawer = useSearchStore((s) => s.closeDrawer);

	return (
		<Sheet
			open={selectedQuestion !== undefined}
			onOpenChange={(open) => {
				if (!open) closeDrawer();
			}}
		>
			<SheetContent
				side="right"
				className="w-245 sm:max-w-none overflow-y-auto"
			>
				<SheetTitle className="sr-only">
					{selectedQuestion?.title ?? "Question details"}
				</SheetTitle>
				<SheetDescription className="sr-only">
					Detailed view of the selected question
				</SheetDescription>
				{selectedQuestion !== undefined && (
					<QuestionView question={selectedQuestion} />
				)}
			</SheetContent>
		</Sheet>
	);
}
