import { IconSearch } from "@tabler/icons-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import { useSearchStore } from "../../stores/search";

export default function SearchInput() {
	const query = useSearchStore((s) => s.query);
	const setQuery = useSearchStore((s) => s.setQuery);
	return (
		<InputGroup className="w-full">
			<InputGroupAddon align="inline-start">
				<IconSearch size={16} />
			</InputGroupAddon>
			<InputGroupInput
				type="search"
				aria-label="Search questions"
				placeholder="Search..."
				value={query}
				onChange={(e) => setQuery(e.target.value)}
			/>
		</InputGroup>
	);
}
