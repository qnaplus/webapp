import { Skeleton } from "@/components/ui/skeleton";

export default function LoadingQuestion() {
	return (
		<div className="flex flex-col gap-3 my-3">
			<Skeleton className="h-8 w-md max-w-full rounded-md" />
			<div className="flex justify-between gap-2">
				<Skeleton className="h-4 w-24 rounded-md" />
				<Skeleton className="h-4 w-24 rounded-md" />
			</div>
			<Skeleton className="h-37.5 w-full rounded-md" />
			<div className="flex gap-2 mt-3">
				<Skeleton className="h-8 w-12 rounded-md" />
				<Skeleton className="h-8 w-12 rounded-md" />
				<Skeleton className="h-8 w-12 rounded-md" />
			</div>
		</div>
	);
}
