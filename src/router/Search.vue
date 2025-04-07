<script setup lang="ts">
import type { Question } from "@qnaplus/scraper";
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { from } from "rxjs";
import { type Ref, inject, ref, watch } from "vue";
import QuestionList from "../components/search/QuestionList.vue";
import QuestionListHeader from "../components/search/QuestionListHeader.vue";
import SearchInput from "../components/search/SearchInput.vue";
import SearchOptions from "../components/search/SearchOptions.vue";
import { useSearch } from "../composable/useSearch";
import { useSearchFilter } from "../composable/useSearchFilter";
import { useSort } from "../composable/useSort";
import { type QnaplusAppData, database } from "../database";

import { useHints } from "../composable/useHints";
import Root from "./Root.vue";
import QuestionDrawer from "../components/search/QuestionDrawer.vue";
import NoResults from "../components/search/NoResults.vue";
import LoadingQuestion from "../components/shared/LoadingQuestion.vue";

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
})
const appData = inject<Ref<QnaplusAppData | undefined>>("appdata");
const { questions } = useSearch(query, dbQuestions);
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
        <div class="h-full flex flex-col gap-3 p-4">
            <div class="flex flex-col gap-3">
                <QuestionListHeader :results="sortedQuestions.length" />
                <SearchInput class="flex-1" v-model="query" />
                <SearchOptions :filter-options="filterOptions" :sort-options="sortOptions" />
            </div>
            <div class="h-full flex flex-col gap-3">
                <LoadingQuestion v-if="loading" />
                <NoResults v-if="!loading && sortedQuestions.length === 0" />
                <QuestionList v-if="!loading" @read-more="(q) => selectedQuestion = q" :query="query"
                    :questions="sortedQuestions" />
            </div>
        </div>
        <ScrollTop />
        <QuestionDrawer @hide-drawer="() => selectedQuestion = undefined" :question="selectedQuestion" />
    </Root>
</template>

<style></style>