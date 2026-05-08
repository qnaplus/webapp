<script setup lang="ts">
import QuestionList from "@/components/search/QuestionList.vue";
import QuestionListHeader from "@/components/search/QuestionListHeader.vue";
import SearchInput from "@/components/search/SearchInput.vue";
import SearchOptions from "@/components/search/SearchOptions.vue";
import { useKeywordSearch } from "@/composable/useSearch";
import { useSearchFilter } from "@/composable/useSearchFilter";
import { useSort } from "@/composable/useSort";
import { type QnaplusAppData, database } from "@/database";
import type { Question } from "@qnaplus/scraper";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { from } from "rxjs";
import { type Ref, inject, ref, watch } from "vue";

import NoResults from "@/components/search/NoResults.vue";
import QuestionDrawer from "@/components/search/QuestionDrawer.vue";
import LoadingQuestion from "@/components/shared/LoadingQuestion.vue";
import { useHints } from "@/composable/useHints";
import Root from "./Root.vue";

const query = ref("");
const dbQuestions = useObservable<Question[]>(
	from(liveQuery(() => database.questions.toArray())),
	{
		initialValue: undefined,
	},
);
const loading = ref(true);
watch(dbQuestions, (q) => {
	setTimeout(() => {
		loading.value = q === undefined;
	}, 500);
});
const appData = inject<Ref<QnaplusAppData | undefined>>("appdata");
const { questions } = useKeywordSearch(query, dbQuestions);
const { filteredQuestions, ...filterOptions } = useSearchFilter(questions, {
	programs: appData?.value?.programs ?? [],
	seasons: appData?.value?.seasons ?? [],
});
const { highlightedQuestions } = useHints(filteredQuestions);
const { sortedQuestions, sortOptions } = useSort(highlightedQuestions);

const selectedQuestion = ref<Question | undefined>(undefined);
</script>

<template>
    <Root>
        <div class="h-full min-h-0 flex gap-3 p-4 overflow-hidden">
            <aside class="flex h-full min-h-0 flex-col w-80 shrink-0">
                <SearchOptions :filter-options="filterOptions" :sort-options="sortOptions" />
            </aside>
            <div class="flex h-full min-h-0 flex-col gap-3 flex-1 min-w-0 overflow-hidden">
                <QuestionListHeader :results="sortedQuestions.length" />
                <SearchInput v-model="query" />
                <div class="flex flex-col gap-3 flex-1 min-h-0 h-full">
                    <LoadingQuestion v-if="loading" />
                    <NoResults v-if="!loading && sortedQuestions.length === 0" />
                    <QuestionList v-if="!loading" @read-more="(q) => selectedQuestion = q" :query="query"
                        :questions="sortedQuestions" />
                </div>
            </div>
        </div>
        <ScrollTop />
        <QuestionDrawer @hide-drawer="() => selectedQuestion = undefined" :question="selectedQuestion" />
    </Root>
</template>

<style></style>