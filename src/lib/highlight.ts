import type { UseSearchResult } from "./minisearch";

const HIGHLIGHT_FIELDS = ["title", "questionRaw", "answerRaw"] as const;

export const applyHints = (results: UseSearchResult[]): UseSearchResult[] => {
	return results.map((result) => {
		if (!("terms" in result)) {
			return result;
		}
		const highlighted = { ...result };
		for (const term of result.terms) {
			const matchedFields = result.match[term];
			for (const field of matchedFields) {
				if (!HIGHLIGHT_FIELDS.includes(field as (typeof HIGHLIGHT_FIELDS)[number])) {
					continue;
				}
				if (field !== "title") {
					highlighted[field as "questionRaw" | "answerRaw"] = (
						highlighted[field as "questionRaw" | "answerRaw"] ?? ""
					).replace(new RegExp(`(${term})`, "gi"), "<mark>$1</mark>");
				}
			}
		}
		return highlighted;
	});
};
