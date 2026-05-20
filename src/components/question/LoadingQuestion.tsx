import { Skeleton } from "@heroui/react";

export default function LoadingQuestion() {
	return (
		<div className="flex flex-col gap-3 my-3">
			<Skeleton className="rounded-md">
				<div className="h-8 w-md max-w-full" />
			</Skeleton>
			<div className="flex justify-between gap-2">
				<Skeleton className="rounded-md">
					<div className="h-4 w-24" />
				</Skeleton>
				<Skeleton className="rounded-md">
					<div className="h-4 w-24" />
				</Skeleton>
			</div>
			<Skeleton className="rounded-md">
				<div className="h-37.5 w-full" />
			</Skeleton>
			<div className="flex gap-2 mt-3">
				<Skeleton className="rounded-md">
					<div className="h-8 w-12" />
				</Skeleton>
				<Skeleton className="rounded-md">
					<div className="h-8 w-12" />
				</Skeleton>
				<Skeleton className="rounded-md">
					<div className="h-8 w-12" />
				</Skeleton>
			</div>
		</div>
	);
}
