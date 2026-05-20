import { InputGroup } from "@heroui/react";
import { IconSearch } from "@tabler/icons-react";
import { useSearchStore } from "../../stores/search";

export default function SearchInput() {
	const query = useSearchStore((s) => s.query);
	const setQuery = useSearchStore((s) => s.setQuery);
	return (
		<InputGroup className="w-full">
			<InputGroup.Prefix>
				<IconSearch size={16} />
			</InputGroup.Prefix>
			<InputGroup.Input
				type="search"
				aria-label="Search questions"
				placeholder="Search..."
				value={query}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setQuery(e.target.value)
				}
			/>
		</InputGroup>
	);
}
