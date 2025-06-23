<script setup lang="ts">
import { useObservable } from "@vueuse/rxjs";
import { liveQuery } from "dexie";
import { from } from "rxjs";
import { type Ref, inject, ref, watch } from "vue";
import { useKeywordSearch } from "../../composable/useSearch";
import { useSearchFilter } from "../../composable/useSearchFilter";
import { useSort } from "../../composable/useSort";
import { database, QuestionAdditionsMap, type QnaplusAppData } from "../../database";
import QuestionList from "../search/QuestionList.vue";
import QuestionListHeader from "../search/QuestionListHeader.vue";
import SearchInput from "../search/SearchInput.vue";
import SearchOptions from "../search/SearchOptions.vue";

import { useHints } from "../../composable/useHints";
import NoResults from "../search/NoResults.vue";
import QuestionDrawer from "../search/QuestionDrawer.vue";
import LoadingQuestion from "../shared/LoadingQuestion.vue";
import { Question } from "@qnaplus/scraper";

const { querier } = defineProps<{
    querier: () => Question[] | Promise<Question[]>
}>();

const query = ref("");

const dbQuestions = useObservable<Question[]>(
    from(liveQuery(querier)),
    {
        initialValue: undefined,
    },
);

const additions = useObservable<QuestionAdditionsMap>(
    from(liveQuery(() =>
        database.additions
            .toArray()
            .then(additions => {
                return additions.reduce<QuestionAdditionsMap>((acc, curr) => {
                    acc[curr.id] = curr
                    return acc;
                }, {})
            })),
    ),
);

const loading = ref(true);
watch(dbQuestions, (q) => {
    setTimeout(() => {
        loading.value = q === undefined;
    }, 500);
})
const appData = inject<Ref<QnaplusAppData | undefined>>("appdata");
const { questions } = useKeywordSearch(query, dbQuestions);
const { filteredQuestions, ...filterOptions } = useSearchFilter(questions, additions, {
    programs: appData?.value?.programs ?? [],
    seasons: appData?.value?.seasons ?? [],
});
const { highlightedQuestions } = useHints(filteredQuestions);
const { sortedQuestions, sortOptions } = useSort(highlightedQuestions);

const selectedQuestion = ref<Question | undefined>(undefined);
</script>

<template>
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
                :questions="sortedQuestions" :additions="additions"/>
        </div>
    </div>
    <ScrollTop />
    <QuestionDrawer @hide-drawer="() => selectedQuestion = undefined" :question="selectedQuestion" />
</template>

<style></style>