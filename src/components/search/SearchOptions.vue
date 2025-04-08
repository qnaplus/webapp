<script setup lang="ts">
import { computed, ref, toRef } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import type { Option } from "../../composable/types";
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
import { getAuthorSuggestions, getTagSuggestions } from "../../composable/useSearch";
import type { AutoCompleteCompleteEvent } from "primevue/autocomplete";

const props = defineProps<{
    filterOptions: SearchFilterOptions;
    sortOptions: SearchSortOptions;
}>();

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

const authorSuggestions = ref<string[]>([]);
const updateAuthorSuggestions = () => {
    authorSuggestions.value = getAuthorSuggestions(props.filterOptions.filters.author);
}


const tagSuggestions = ref<string[]>([]);
const updateTagSuggestions = (e: AutoCompleteCompleteEvent) => {
    tagSuggestions.value = getTagSuggestions(e.query);
    console.log(tagSuggestions)
}

</script>

<template>

    <Accordion :value="undefined">
        <AccordionPanel :value="0">
            <AccordionHeader>Search Options</AccordionHeader>
            <AccordionContent>
                <Tabs value="0">
                    <TabList>
                        <Tab class="flex gap-3" value="0">Filter
                            <Badge class="ml-2" :value="filterOptions.appliedFilterCount.value" />
                        </Tab>
                        <Tab value="1">Sort</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel value="0">
                            <div class="flex flex-col gap-3">
                                <div class="flex flex-wrap gap-3">

                                    <div class="flex flex-wrap gap-3 flex-1">
                                        <div class="m-0 dropdown-flex">
                                            <label for="season">Season</label>
                                            <MultiSelect class="w-full" input-id="season"
                                                v-model="filterOptions.filters.season" placeholder="Season"
                                                :options="filterOptions.seasons" option-label="name" />
                                        </div>
                                        <div class="m-0 dropdown-flex">
                                            <label for="program">Program</label>
                                            <MultiSelect class="w-full" input-id="program"
                                                v-model="filterOptions.filters.program" placeholder="Program"
                                                :options="filterOptions.programs" option-label="name" />
                                        </div>
                                    </div>

                                    <div class="flex flex-1 flex-wrap gap-3">
                                        <div class="m-0 input-flex">
                                            <label for="author">Author</label>
                                            <IconField>
                                                <InputIcon class="pi pi-user" />
                                                <AutoComplete id="author" class="w-full" input-class="w-full"
                                                    v-model="filterOptions.filters.author"
                                                    @complete="updateAuthorSuggestions" :suggestions="authorSuggestions"
                                                    placeholder="Author" />
                                            </IconField>
                                        </div>

                                        <div class="m-0 input-flex">
                                            <label for="Question State">Question State</label>
                                            <SelectButton class="select-button-flex" :allow-empty="false"
                                                v-model="filterOptions.filters.state" :options="questionStateOptions"
                                                option-label="name" aria-labelledby="multiple" />
                                        </div>
                                    </div>
                                </div>

                                <div class="flex flex-wrap gap-3 ">
                                    <div class="flex flex-1 min-w-fit gap-3">
                                        <div class="m-0 flex-1">
                                            <label for="askedBefore">Asked Before</label>
                                            <DatePicker class="w-full" input-id="askedBefore"
                                                v-model="filterOptions.filters.askedBefore" placeholder="Asked Before"
                                                show-icon show-button-bar icon-display="input" />
                                        </div>
                                        <div class="m-0 flex-1">
                                            <label for="askedAfter">Asked After</label>
                                            <DatePicker class="w-full" input-id="askedAfter"
                                                v-model="filterOptions.filters.askedAfter" placeholder="Asked After"
                                                show-icon show-button-bar icon-display="input" />
                                        </div>
                                    </div>
                                    <div class="flex flex-1 min-w-fit gap-3">
                                        <div class="m-0 flex-1">
                                            <label for="answeredBefore" aria-label="Answered Before">Answered
                                                Before</label>
                                            <DatePicker class="w-full" input-id="answeredBefore"
                                                v-model="filterOptions.filters.answeredBefore"
                                                placeholder="Answered Before" show-icon show-button-bar
                                                icon-display="input" />
                                        </div>
                                        <div class="m-0 flex-1">
                                            <label for="answeredAfter" aria-label="Answered After">Answered
                                                After</label>
                                            <DatePicker class="w-full" input-id="answeredAfter"
                                                v-model="filterOptions.filters.answeredAfter"
                                                placeholder="Answered After" show-icon fluid show-button-bar
                                                icon-display="input" />
                                        </div>
                                    </div>
                                </div>

                                <div class="m-0">
                                    <label for="tags">Tags</label>
                                    <InputGroup>
                                        <InputGroupAddon>
                                            <i class="pi pi-tags" aria-label="Tags" />
                                        </InputGroupAddon>
                                        <AutoComplete class="autocomplete-group" multiple input-id="tags"
                                            v-model="filterOptions.filters.tags" aria-label="Tags"
                                            @value-change="(v) => console.log(v)" @complete="updateTagSuggestions"
                                            :suggestions="tagSuggestions" placeholder="Tags" />
                                    </InputGroup>
                                </div>
                                <div>
                                    <Button @click="filterOptions.clearFilters()"><b>Reset Filters</b></Button>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel value="1">
                            <template #header>
                                <span style="height: 24px">Sort</span>
                            </template>
                            <div class="flex flex-col gap-3">
                                <div class="flex justify-end">
                                    <div class="flex items-center gap-3">
                                        <label for="advanced_toggle">Advanced Sorting</label>
                                        <ToggleSwitch v-model="sortOptions.advancedEnabled"
                                            input-id="advanced_toggle" />
                                    </div>
                                </div>
                                <div class="flex flex-wrap gap-3" v-if="!sortOptions.advancedEnabled">
                                    <div class="flex-1 m-0">
                                        <label for="basic_sort_option">Sort By</label>
                                        <Select class="w-full" input-id="basic_sort_option"
                                            v-model="sortOptions.basic.sort" :options="sortOptionsList"
                                            option-label="name" />
                                    </div>
                                    <div class="flex-1 m-0">
                                        <label for="basic_sort_order">Order</label>
                                        <Select class="w-full" input-id="basic_sort_order"
                                            v-model="sortOptions.basic.asc" :options="sortOrderList"
                                            option-label="name" />
                                    </div>
                                </div>
                                <div class="flex flex-col gap-3" v-else>
                                    <div class="flex-1">
                                        <label for="sort_option">Sort Option</label>
                                        <Select class="w-full" input-id="sort_option"
                                            :options="remainingAdvancedOptions" option-label="name"
                                            @update:model-value="updateSelectedAdvancedOption" />
                                    </div>
                                    <VueDraggable ref="el" v-model="sortOptions.advanced" ghostClass="sort-ghost"
                                        dragClass="sort-drag" :animation="150" handle=".handle">
                                        <div v-for="(option, index) in sortOptions.advanced">
                                            <div class="flex flex-wrap gap-3">
                                                <div class="flex flex-1 items-center">
                                                    <div class="handle cursor-move p-2 pi pi-bars ml-2"></div>
                                                    <span class="">{{ option.name }}</span>
                                                </div>
                                                <div class="flex flex-1 items-center gap-3">
                                                    <div class="flex flex-1 items-center gap-3 m-0">
                                                        <label :for="'advanced_sort_order_' + option.name">Order</label>
                                                        <Select class="flex-1"
                                                            :input-id="'advanced_sort_order_' + option.name"
                                                            v-model="sortOptions.advanced[index].asc"
                                                            :options="sortOrderList" option-label="name" />
                                                    </div>
                                                    <Button class="self-end" type="button" severity="secondary" rounded
                                                        outlined aria-label="Remove Sort" icon="pi pi-times"
                                                        @click="removeSelectedAdvancedOption(index)" />
                                                </div>
                                            </div>
                                            <Divider />
                                        </div>
                                    </VueDraggable>
                                </div>
                            </div>
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </AccordionContent>
        </AccordionPanel>
    </Accordion>
</template>

<style scoped>
.min-w-fit {
    min-width: fit-content;
}

.select-button-flex {
    display: flex;
}

.dropdown-flex {
    flex: 231.6px
}

.input-flex {
    flex: 170px;
}

.sort-ghost {
    opacity: 0;
}

.border-1 {
    border-width: 1px;
}
</style>
