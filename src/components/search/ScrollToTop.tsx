import { useEffect, useState } from "react";
import { IconArrowUp } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";

export default function ScrollToTop() {
	const [visible, setVisible] = useState(false);

	useEffect(() => {
		const onScroll = () => setVisible(window.scrollY > 300);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const scrollToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	if (!visible) return null;

	return (
		<>
			{/* Mobile: panel with fade at top */}
			<div className="fixed bottom-0 inset-x-0 z-900 pointer-events-none sm:hidden">
				<div className="h-8 bg-linear-to-t from-background to-transparent" />
				<div className="bg-background px-4 pb-4 pt-2 pointer-events-auto">
					<Button
						variant="outline"
						onClick={scrollToTop}
						aria-label="Scroll to top"
						className="w-full shadow-md"
					>
						<IconArrowUp size={18} />
						<span className="ml-2 text-sm">Back to top</span>
					</Button>
				</div>
			</div>
			{/* Desktop: icon button on the side */}
			<Button
				variant="secondary"
				onClick={scrollToTop}
				aria-label="Scroll to Top"
				className="fixed bottom-6 right-6 z-40 shadow-md hidden sm:inline-flex"
			>
				<IconArrowUp size={18} /> Scroll to Top
			</Button>
		</>
	);
}
