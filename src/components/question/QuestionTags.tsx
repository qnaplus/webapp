import { Chip } from "@heroui/react";
import ProgramTag from "./ProgramTag";

type Props = {
	tags: string[];
	program: string;
};

export default function QuestionTags({ tags, program }: Props) {
	return (
		<div className="flex flex-wrap gap-2">
			<ProgramTag program={program} />
			{tags.map((tag) => (
				<Chip key={tag} size="md" variant="soft">
					{tag}
				</Chip>
			))}
		</div>
	);
}
