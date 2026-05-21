import type { ReactNode } from "react";
import HeaderBar from "./HeaderBar";

type Props = {
	children: ReactNode;
};

export default function Root({ children }: Props) {
	return (
		<div className="min-h-svh flex flex-col">
			{/* <HeaderBar /> */}
			<div className="flex-1 w-full px-0 md:px-8 lg:px-20 xl:px-[20%]">
				{children}
			</div>
		</div>
	);
}
