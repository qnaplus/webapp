import { Button } from "@/components/ui/button";
import { IconBrandDiscordFilled, IconBrandGithubFilled } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import ColorModeToggle from "./ColorModeToggle";
import { Link } from "wouter";

export default function HeaderBar() {
	const [stuck, setStuck] = useState(false);

	useEffect(() => {
		const update = () => setStuck(window.scrollY > 0);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	return (
		<>
			<header
				className={
					"fixed h-15 top-0 left-0 right-0 z-10 p-3 flex items-center justify-between transition-all duration-300 border-b   " +
					(stuck
						? "bg-[color-mix(in_oklab,var(--background)_70%,transparent)] backdrop-blur-md border-b-primary/50"
						: "bg-background ")
				}
			>
				<Link
					href="/"
					className="ml-2 font-medium text-foreground no-underline"
				>
					<span className="text-xl font-semibold">qna</span>
					<span className="text-xl font-semibold text-primary">plus</span>
				</Link>
				<div className="flex items-center gap-2">
					<a
						href="https://nexus.qnapl.us"
						target="_blank"
						rel="noreferrer"
						aria-label="Discord"
					>
						<Button size="icon" variant="ghost" aria-label="Discord">
							<IconBrandDiscordFilled size={18} />
						</Button>
					</a>
					<a
						href="https://github.com/qnaplus"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
					>
						<Button size="icon" variant="ghost" aria-label="GitHub">
							<IconBrandGithubFilled size={18} />
						</Button>
					</a>
					<ColorModeToggle />
				</div>
			</header>
		</>
	);
}
