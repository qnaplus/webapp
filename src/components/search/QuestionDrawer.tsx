import { Drawer } from "@heroui/react";
import { useSearchStore } from "../../stores/search";
import QuestionView from "../question/QuestionView";

export default function QuestionDrawer() {
	const selectedQuestion = useSearchStore((s) => s.selectedQuestion);
	const closeDrawer = useSearchStore((s) => s.closeDrawer);

	return (
		<Drawer.Root
			isOpen={selectedQuestion !== undefined}
			onOpenChange={(open) => {
				if (!open) closeDrawer();
			}}
		>
			<Drawer.Backdrop>
				<Drawer.Content placement="right" className="md:w-240 w-full">
					<Drawer.Dialog>
						<Drawer.Body>
							{selectedQuestion !== undefined && (
								<QuestionView question={selectedQuestion} />
							)}
						</Drawer.Body>
					</Drawer.Dialog>
				</Drawer.Content>
			</Drawer.Backdrop>
		</Drawer.Root>
	);
}
