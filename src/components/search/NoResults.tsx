import { Card } from "@heroui/react";

export default function NoResults() {
	return (
		<Card.Root className="text-center p-3 max-w-none rounded-md">
			<Card.Header>
				<h2 className="text-5xl font-bold">:(</h2>
			</Card.Header>
			<Card.Content>
				<p>(no results)</p>
			</Card.Content>
		</Card.Root>
	);
}
