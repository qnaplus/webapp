import type { ReactNode } from "react";
import HeaderBar from "./HeaderBar";
import { cn } from "../../lib/utils";

type Props = {
	children: ReactNode;
    className?: string;
};

export default function Root({ children, className }: Props) {
	return (
		<div className="min-h-svh flex flex-col">
			<HeaderBar />
			<div className={cn("flex-1 w-full px-0 md:px-8 lg:px-20 xl:px-[20%]", className)}>
				{children}
			</div>
		</div>
	);
}
