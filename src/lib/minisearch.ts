import type { Question } from "@qnaplus/scraper";
import MiniSearch, { type SearchResult } from "minisearch";
import { stemmer } from "stemmer";
import { isEmpty } from "../util/strings";

export type QuestionSearchResult = Question & SearchResult;

export type UseSearchResult = Question | QuestionSearchResult;

const HTML_TOKENIZER_REGEX = /(?:[\n\r\p{Z}\p{P}]|(?:<\/?\w+>))+/gu;

export const minisearch = new MiniSearch<Question>({
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

export const loadMinisearch = async (questions: Question[]): Promise<void> => {
	if (loaded) {
		return;
	}
	try {
		await minisearch.addAllAsync(questions, { chunkSize: 50 });
		loaded = true;
	} catch (e) {
		console.error(e);
	}
};

export const runMinisearch = (
	query: string,
	dbQuestions: Question[] | undefined,
): UseSearchResult[] => {
	if (dbQuestions === undefined) {
		return [];
	}
	if (isEmpty(query)) {
		return dbQuestions;
	}
	return minisearch.search(query, {
		fields: ["title", "questionRaw", "answerRaw"],
		processTerm: (term) => stemmer(term).toLowerCase(),
		prefix: true,
	}) as QuestionSearchResult[];
};

export const getAuthorSuggestions = (author: string | null): string[] => {
	if (author === null || author === "") {
		return [];
	}
	const results = minisearch.search(author, {
		fields: ["author"],
		prefix: true,
	}) as QuestionSearchResult[];
	return [...new Set(results.map((r) => r.author))];
};

export const getTagSuggestions = (tag: string | undefined): string[] => {
	if (tag === undefined || tag === "") {
		return [];
	}
	const results = minisearch.search(tag, {
		fields: ["tags"],
		prefix: true,
	}) as QuestionSearchResult[];
	const isMatchingTag = (result: QuestionSearchResult) =>
		result.tags.filter((t) => result.terms.includes(t.toLowerCase()));
	return [...new Set(results.flatMap(isMatchingTag).sort())];
};
