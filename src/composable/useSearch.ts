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
	fields: ["title", "questionRaw", "answerRaw"],
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

export const useSearch = (
	query: MaybeRefOrGetter<string>,
	dbQuestions: Readonly<Ref<Question[]>>,
) => {
	const questions = ref<UseSearchResult[]>([]);

	const search = () => {
		const value = toValue(query);
		if (isEmpty(value)) {
			questions.value = dbQuestions.value;
		} else {
			const results = minisearch.search(value, {
				processTerm: (term) => stemmer(term).toLowerCase(),
				prefix: true,
			}) as QuestionSearchResult[];
			questions.value = results;
		}
	};

	watchEffect(() => search());

	return { questions };
};
