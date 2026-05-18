<script setup lang="ts">
import { computed, ref } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import type { Option } from "../../composable/types";
import {
    getAuthorSuggestions,
    getTagSuggestions,
} from "../../composable/useSearch";
import {
    type SearchFilterOptions,
    questionStateOptions,
} from "../../composable/useSearchFilter";
import {
    type SearchSortOptions,
    type SortOptions,
    sortOptionsList,
    sortOrderList,
} from "../../composable/useSort";
import DateField from "../shared/DateField.vue";

const props = defineProps<{
    filterOptions: SearchFilterOptions;
    sortOptions: SearchSortOptions;
}>();

const tabItems = computed(() => [
    {
        label: "Filter",
        slot: "filter" as const,
        badge: props.filterOptions.appliedFilterCount.value,
    },
    { label: "Sort", slot: "sort" as const },
]);

const remainingAdvancedOptions = computed(() => {
    return sortOptionsList.filter(
        (sortOption) =>
            !props.sortOptions.advanced.find(
                (selectedSortOption) => sortOption.value === selectedSortOption.value,
            ),
    );
});

const updateSelectedAdvancedOption = (value: Option<SortOptions>) => {
    props.sortOptions.advanced.push({ ...value, asc: sortOrderList[0] });
};

const removeSelectedAdvancedOption = (index: number) => {
    props.sortOptions.advanced.splice(index, 1);
};

const authorSearchTerm = ref("");
const authorSuggestions = computed(() =>
    getAuthorSuggestions(authorSearchTerm.value),
);
const authorModel = computed({
    get: () => props.filterOptions.filters.author ?? undefined,
    set: (v: string | undefined) => {
        props.filterOptions.filters.author = v ?? null;
    },
});

const stateModel = computed({
    get: () => props.filterOptions.filters.state.value,
    set: (v) => {
        const found = questionStateOptions.find((o) => o.value === v);
        if (found) props.filterOptions.filters.state = found;
    },
});

const tagSearchTerm = ref("");
const tagSuggestions = computed(() => getTagSuggestions(tagSearchTerm.value));
</script>

<template>
    <UTabs :items="tabItems" variant="link" :content="true">
        <template #leading="{ item }">
        </template>
        <template #filter>
            <div class="flex flex-col gap-3 pt-3">
                <div class="flex flex-wrap gap-2">
                    <div class="flex flex-wrap gap-2 flex-1">
                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="season">Season</label>
                            <USelectMenu id="season" class="w-full" multiple v-model="filterOptions.filters.season"
                                :items="filterOptions.seasons" label-key="name" placeholder="Season" />
                        </div>
                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="program">Program</label>
                            <USelectMenu id="program" class="w-full" multiple v-model="filterOptions.filters.program"
                                :items="filterOptions.programs" label-key="name" placeholder="Program" />
                        </div>
                    </div>

                    <div class="flex flex-1 flex-wrap gap-2">
                        <UFormField class="m-0">
                            <label class="text-sm font-medium text-muted" for="author">Author</label>
                            <UInputMenu id="author" class="w-full" v-model="authorModel"
                                v-model:search-term="authorSearchTerm" :items="authorSuggestions" ignore-filter
                                icon="i-lucide-user" placeholder="Author" />
                        </UFormField>

                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="state">Question State</label>
                            <URadioGroup id="state" orientation="vertical" variant="table" v-model="stateModel"
                                :items="questionStateOptions" label-key="name" :ui="{ item: 'flex-1 p-1' }" />
                        </div>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <div class="flex flex-wrap gap-2">
                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="askedBefore">Asked Before</label>
                            <DateField input-id="askedBefore" v-model="filterOptions.filters.askedBefore"
                                aria-label="Asked Before" />
                        </div>
                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="askedAfter">Asked After</label>
                            <DateField input-id="askedAfter" v-model="filterOptions.filters.askedAfter"
                                aria-label="Asked After" />
                        </div>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="answeredBefore">Answered Before</label>
                            <DateField input-id="answeredBefore" v-model="filterOptions.filters.answeredBefore"
                                aria-label="Answered Before" />
                        </div>
                        <div class="m-0 flex-1">
                            <label class="text-sm font-medium text-muted" for="answeredAfter">Answered After</label>
                            <DateField input-id="answeredAfter" v-model="filterOptions.filters.answeredAfter"
                                aria-label="Answered After" />
                        </div>
                    </div>
                </div>

                <div class="m-0">
                    <label class="text-sm font-medium text-muted" for="tags">Tags</label>
                    <UInputMenu id="tags" class="w-full" multiple v-model="filterOptions.filters.tags"
                        v-model:search-term="tagSearchTerm" :items="tagSuggestions" ignore-filter icon="i-lucide-tags"
                        aria-label="Tags" placeholder="Tags" />
                </div>
                <div>
                    <UButton label="Reset Filters" color="neutral" variant="outline" size="sm"
                        @click="filterOptions.clearFilters()" />
                </div>
            </div>
        </template>
        <template #sort>
            <div class="flex flex-col gap-3 pt-3">
                <div class="flex justify-end">
                    <div class="flex items-center gap-2">
                        <label class="text-sm font-medium text-muted" for="advanced_toggle">Advanced Sorting</label>
                        <USwitch id="advanced_toggle" v-model="sortOptions.advancedEnabled" />
                    </div>
                </div>
                <div class="flex flex-wrap gap-2" v-if="!sortOptions.advancedEnabled">
                    <div class="flex-1 m-0">
                        <label class="text-sm font-medium text-muted" for="basic_sort_option">Sort By</label>
                        <USelectMenu id="basic_sort_option" class="w-full" v-model="sortOptions.basic.sort"
                            :items="sortOptionsList" label-key="name" />
                    </div>
                    <div class="flex-1 m-0">
                        <label class="text-sm font-medium text-muted" for="basic_sort_order">Order</label>
                        <USelectMenu id="basic_sort_order" class="w-full" v-model="sortOptions.basic.asc"
                            :items="sortOrderList" label-key="name" />
                    </div>
                </div>
                <div class="flex flex-col gap-3" v-else>
                    <div class="flex-1">
                        <label class="text-sm font-medium text-muted" for="sort_option">Sort Option</label>
                        <USelectMenu id="sort_option" class="w-full" :items="remainingAdvancedOptions" label-key="name"
                            @update:model-value="updateSelectedAdvancedOption" />
                    </div>
                    <VueDraggable ref="el" v-model="sortOptions.advanced" ghostClass="sort-ghost" dragClass="sort-drag"
                        :animation="150" handle=".handle">
                        <div v-for="(option, index) in sortOptions.advanced" :key="option.value">
                            <div class="flex flex-wrap gap-2">
                                <div class="flex flex-1 items-center">
                                    <UIcon name="i-lucide-grip-vertical" class="handle cursor-move m-2" />
                                    <span class="">{{ option.name }}</span>
                                </div>
                                <div class="flex flex-1 items-center gap-2">
                                    <div class="flex flex-1 items-center gap-2 m-0">
                                        <label class="text-sm font-medium text-muted"
                                            :for="'advanced_sort_order_' + option.name">Order</label>
                                        <USelectMenu class="flex-1" :id="'advanced_sort_order_' + option.name"
                                            v-model="sortOptions.advanced[index].asc" :items="sortOrderList"
                                            label-key="name" />
                                    </div>
                                    <UButton class="self-end" type="button" color="neutral" variant="outline"
                                        aria-label="Remove Sort" icon="i-lucide-x"
                                        @click="removeSelectedAdvancedOption(index)" />
                                </div>
                            </div>
                            <USeparator class="my-2" />
                        </div>
                    </VueDraggable>
                </div>
            </div>
        </template>
    </UTabs>
</template>

<style scoped>
.min-w-fit {
    min-width: fit-content;
}

.sort-ghost {
    opacity: 0;
}

.border-1 {
    border-width: 1px;
}
</style>
