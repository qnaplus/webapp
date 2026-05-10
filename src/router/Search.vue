<script setup lang="ts">
import AppLayout from "@/components/layout/AppLayout.vue";
import NoResults from "@/components/search/NoResults.vue";
import QuestionDrawer from "@/components/search/QuestionDrawer.vue";
import QuestionList from "@/components/search/QuestionList.vue";
import QuestionListHeader from "@/components/search/QuestionListHeader.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import SearchOptions, {
	type HideableFilter,
} from "@/components/search/SearchOptions.vue";
import LoadingQuestion from "@/components/shared/LoadingQuestion.vue";
import { useHints } from "@/composable/useHints";
import { useKeywordSearch } from "@/composable/useSearch";
import {
	type SearchFilters,
	useSearchFilter,
} from "@/composable/useSearchFilter";
import { useSort } from "@/composable/useSort";
import { type QnaplusAppData, database } from "@/database";
import type { Question } from "@qnaplus/scraper";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { from } from "rxjs";
import { type Ref, computed, inject, ref, watch } from "vue";

const props = defineProps<{
	program?: string;
	season?: string;
}>();

const query = ref("");
const dbQuestions = useObservable<Question[]>(
	from(liveQuery(() => database.questions.toArray())),
	{ initialValue: undefined },
);
const loading = ref(true);
watch(dbQuestions, (q) => {
	setTimeout(() => {
		loading.value = q === undefined;
	}, 500);
});

const appData = inject<Ref<QnaplusAppData | undefined>>("appdata");
const { questions } = useKeywordSearch(query, dbQuestions);

const initialFilters: Partial<SearchFilters> = {
	...(props.program
		? { program: [{ name: props.program, value: props.program }] }
		: {}),
	...(props.season
		? { season: [{ name: props.season, value: props.season }] }
		: {}),
};

const { filteredQuestions, ...filterOptions } = useSearchFilter(questions, {
	programs: appData?.value?.programs ?? [],
	seasons: appData?.value?.seasons ?? [],
	initial: initialFilters,
});
const { highlightedQuestions } = useHints(filteredQuestions);
const { sortedQuestions, sortOptions } = useSort(highlightedQuestions);

const hiddenFilters = computed<HideableFilter[]>(() => {
	const hidden: HideableFilter[] = [];
	if (props.program) hidden.push("program");
	if (props.season) hidden.push("season");
	return hidden;
});

const selectedQuestion = ref<Question | undefined>(undefined);
</script>

<template>
	<AppLayout>
		<QuestionListHeader :results="sortedQuestions.length" />
		<SearchInput v-model="query" />
		<SearchOptions
			:filter-options="filterOptions"
			:sort-options="sortOptions"
			:hidden-filters="hiddenFilters"
		/>
		<div class="flex flex-col gap-3 flex-1 min-h-0 h-full">
			<LoadingQuestion v-if="loading" />
			<NoResults v-if="!loading && sortedQuestions.length === 0" />
			<QuestionList
				v-if="!loading"
				@read-more="(q) => (selectedQuestion = q)"
				:query="query"
				:questions="sortedQuestions"
			/>
		</div>
		<ScrollTop />
		<QuestionDrawer
			@hide-drawer="() => (selectedQuestion = undefined)"
			:question="selectedQuestion"
		/>
	</AppLayout>
</template>
