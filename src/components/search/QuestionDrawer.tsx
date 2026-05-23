import QuestionView from "@/components/question/QuestionView";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
} from "@/components/ui/drawer";
import { useSearchStore } from "@/stores/search";

export default function QuestionDrawer() {
	const selectedQuestion = useSearchStore((s) => s.selectedQuestion);
	const closeDrawer = useSearchStore((s) => s.closeDrawer);

	return (
		<Drawer
			open={selectedQuestion !== undefined}
			onOpenChange={(open) => {
				if (!open) closeDrawer();
			}}
			swipeDirection="right"
		>
			<DrawerContent
				swipeDirection="right"
				// showCloseButton={false}
			>
				<DrawerTitle className="sr-only">
					{selectedQuestion?.title ?? "Question details"}
				</DrawerTitle>
				<DrawerDescription className="sr-only">
					Detailed view of the selected question
				</DrawerDescription>
				{selectedQuestion !== undefined && (
					<QuestionView className="mt-10" question={selectedQuestion} />
				)}
			</DrawerContent>
		</Drawer>
	);
}
