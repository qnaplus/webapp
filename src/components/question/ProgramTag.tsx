import { Badge } from "@/components/ui/badge";

type Props = {
	program: string;
};

const COLOR_MAP: Record<string, string> = {
	v5rc: "#f84f4f",
	vurc: "#9571ca",
	viqrc: "#4894f7",
	judging: "#f5ad42",
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export default function ProgramTag({ program }: Props) {
	const key = program.toLowerCase();
	const color = COLOR_MAP[key] ?? "#9ca3af";
	return (
		<Badge
			variant="soft"
			style={{
				backgroundColor: `color-mix(in srgb, ${color}, transparent 84%)`,
				color,
			}}
		>
			{capitalize(program)}
		</Badge>
	);
}
