import type { Question } from "@qnaplus/scraper";
import MiniSearch, { type SearchResult } from "minisearch";
import { stemmer } from "stemmer";
import {
	type MaybeRefOrGetter,
	type Ref,
	ref,
	toValue,
	watchEffect,
} from "vue";
import { isEmpty } from "../util/strings";

export type QuestionSearchResult = Question & SearchResult;

export type UseSearchResult = Question | QuestionSearchResult;

const HTML_TOKENIZER_REGEX = /(?:[\n\r\p{Z}\p{P}]|(?:<\/?\w+>))+/gu;

const minisearch = new MiniSearch<Question>({
	fields: ["title", "author", "questionRaw", "answerRaw", "tags"],
	storeFields: [
		"id",
		"url",
		"author",
		"program",
		"title",
		"question",
		"questionRaw",
		"answer",
		"answerRaw",
		"season",
		"askedTimestamp",
		"askedTimestampMs",
		"answeredTimestamp",
		"answeredTimestampMs",
		"answered",
		"tags",
	],
	tokenize: (text) =>
		text.split(HTML_TOKENIZER_REGEX).filter((t) => !isEmpty(t)),
});

let loaded = false;

export const loadMinisearch = async (questions: Question[]) => {
	if (loaded) {
		return;
	}
	try {
		await minisearch.addAllAsync(questions, {
			chunkSize: 50,
		});
		loaded = true;
	} catch (e) {
		console.error(e);
	}
};

export const useKeywordSearch = (
	query: MaybeRefOrGetter<string>,
	dbQuestions: Readonly<Ref<Question[] | undefined>>,
) => {
	const questions = ref<UseSearchResult[]>([]);

	const search = () => {
		const value = toValue(query);
		if (dbQuestions.value === undefined) {
			questions.value = [];
		} else if (isEmpty(value)) {
			questions.value = dbQuestions.value;
		} else {
			const results = minisearch.search(value, {
				fields: ["title", "questionRaw", "answerRaw"],
				processTerm: (term) => stemmer(term).toLowerCase(),
				prefix: true,
			}) as QuestionSearchResult[];
			questions.value = results;
		}
	};

	watchEffect(() => search());

	return { questions };
};

export const getAuthorSuggestions = (
	author: MaybeRefOrGetter<string | null>,
) => {
	const value = toValue(author);
	if (value === null) {
		return [];
	}
	const results = minisearch.search(value, {
		fields: ["author"],
		prefix: true,
	}) as QuestionSearchResult[];
	return [...new Set(results.map((r) => r.author))];
};

export const getTagSuggestions = (
	tag: MaybeRefOrGetter<string | undefined>,
) => {
	const value = toValue(tag);
	if (value === undefined) {
		return [];
	}
	const results = minisearch.search(value, {
		fields: ["tags"],
		prefix: true,
	}) as QuestionSearchResult[];
    
	const isMatchingTag = (result: QuestionSearchResult) =>
		result.tags.filter((t) => result.terms.includes(t.toLowerCase()));

	return [...new Set(results.flatMap(isMatchingTag).sort())];
};
