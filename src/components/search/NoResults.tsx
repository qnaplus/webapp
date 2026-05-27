import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function NoResults() {
	return (
		<Card className="text-center p-3 max-w-none rounded-md">
			<CardHeader>
				<h2 className="text-5xl font-bold">:(</h2>
			</CardHeader>
			<CardContent>
				<p>(no results)</p>
			</CardContent>
		</Card>
	);
}
