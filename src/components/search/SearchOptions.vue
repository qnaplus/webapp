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
                        <UFormField class="m-0 flex-1" label="Season">
                            <USelectMenu id="season" class="w-full" multiple v-model="filterOptions.filters.season"
                                :items="filterOptions.seasons" label-key="name" placeholder="Season" />
                        </UFormField>
                        <UFormField class="m-0 flex-1" label="Program">
                            <USelectMenu id="program" class="w-full" multiple v-model="filterOptions.filters.program"
                                :items="filterOptions.programs" label-key="name" placeholder="Program" />
                        </UFormField>
                    </div>

                    <div class="flex flex-1 flex-wrap gap-2">
                        <UFormField class="m-0" label="Author">
                            <UInputMenu id="author" class="w-full" v-model="authorModel"
                                v-model:search-term="authorSearchTerm" :items="authorSuggestions" ignore-filter
                                icon="i-lucide-user" placeholder="Author" />
                        </UFormField>

                        <UFormField class="m-0 flex-1" label="Question State">
                            <URadioGroup id="state" orientation="vertical" variant="table" v-model="stateModel"
                                :items="questionStateOptions" label-key="name" :ui="{ item: 'flex-1 p-1' }" />
                        </UFormField>
                    </div>
                </div>

                <div class="flex flex-wrap gap-2">
                    <div class="flex flex-wrap gap-2">
                        <UFormField class="m-0 flex-1" label="Asked Before">
                            <DateField input-id="askedBefore" v-model="filterOptions.filters.askedBefore"
                                aria-label="Asked Before" />
                        </UFormField>
                        <UFormField class="m-0 flex-1" label="Asked After">
                            <DateField input-id="askedAfter" v-model="filterOptions.filters.askedAfter"
                                aria-label="Asked After" />
                        </UFormField>
                    </div>
                    <div class="flex flex-wrap gap-2">
                        <UFormField class="m-0 flex-1" label="Answered Before">
                            <DateField input-id="answeredBefore" v-model="filterOptions.filters.answeredBefore"
                                aria-label="Answered Before" />
                        </UFormField>
                        <UFormField class="m-0 flex-1" label="Answered After">
                            <DateField input-id="answeredAfter" v-model="filterOptions.filters.answeredAfter"
                                aria-label="Answered After" />
                        </UFormField>
                    </div>
                </div>

                <UFormField label="Tags">
                    <UInputMenu id="tags" class="w-full" multiple v-model="filterOptions.filters.tags"
                        v-model:search-term="tagSearchTerm" :items="tagSuggestions" ignore-filter icon="i-lucide-tags"
                        aria-label="Tags" placeholder="Tags" />
                </UFormField>
                <UButton label="Reset Filters" color="error" variant="soft" class="justify-center font-bold"
                    @click="filterOptions.clearFilters()" />
            </div>
        </template>
        <template #sort>
            <div class="flex flex-col gap-3 pt-3">
                <div class="flex justify-end">
                    <UFormField class="flex items-center gap-2" label="Advanced Sorting">
                        <USwitch id="advanced_toggle" v-model="sortOptions.advancedEnabled" />
                    </UFormField>
                </div>
                <div class="flex flex-wrap gap-2" v-if="!sortOptions.advancedEnabled">
                    <UFormField class="flex-1 m-0" label="Sort By">
                        <USelectMenu id="basic_sort_option" class="w-full" v-model="sortOptions.basic.sort"
                            :items="sortOptionsList" label-key="name" />
                    </UFormField>
                    <UFormField class="flex-1 m-0" label="Order">
                        <USelectMenu id="basic_sort_order" class="w-full" v-model="sortOptions.basic.asc"
                            :items="sortOrderList" label-key="name" />
                    </UFormField>
                </div>
                <div class="flex flex-col gap-3" v-else>
                    <UFormField class="flex-1" label="Sort Option">
                        <USelectMenu id="sort_option" class="w-full" :items="remainingAdvancedOptions" label-key="name"
                            @update:model-value="updateSelectedAdvancedOption" />
                    </UFormField>
                    <VueDraggable ref="el" v-model="sortOptions.advanced" ghostClass="sort-ghost" dragClass="sort-drag"
                        :animation="150" handle=".handle">
                        <div v-for="(option, index) in sortOptions.advanced" :key="option.value">
                            <div class="flex flex-wrap gap-2">
                                <div class="flex flex-1 items-center">
                                    <UIcon name="i-lucide-grip-vertical" class="handle cursor-move m-2" />
                                    <span class="">{{ option.name }}</span>
                                </div>
                                <div class="flex flex-1 items-center gap-2">
                                    <UFormField class="flex flex-1 items-center gap-2 m-0" label="Order">
                                        <USelectMenu class="flex-1" :id="'advanced_sort_order_' + option.name"
                                            v-model="sortOptions.advanced[index].asc" :items="sortOrderList"
                                            label-key="name" />
                                    </UFormField>
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
