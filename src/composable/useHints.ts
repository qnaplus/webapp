import { type MaybeRefOrGetter, ref, toValue, watchEffect } from "vue";
import type { UseSearchResult } from "./useSearch";

export const getHints = (result: UseSearchResult) => {
    if (!("terms" in result)) {
        return result;
    }
    const highlighted = { ...result };
    const wantedFields = ["title", "questionRaw", "answerRaw"];
    for (const term of result.terms) {
        for (const field of result.match[term]) {
            if (!wantedFields.includes(field)) {
                continue;
            }
            if (field !== "title") {
                highlighted[field] = highlighted[field].replace(new RegExp(`(${term})`, "gi"), "<mark>$1</mark>");
            }
        }
    }
    return highlighted;
}

export const useHints = (
    _query: MaybeRefOrGetter<string>,
    results: MaybeRefOrGetter<UseSearchResult[]>
) => {
    const highlightedQuestions = ref<UseSearchResult[]>([]);
    const highlight = () => {
        const resultsValue = toValue(results);
        highlightedQuestions.value = resultsValue.map(getHints)
    }
    watchEffect(() => highlight());

    return { highlightedQuestions }
}
