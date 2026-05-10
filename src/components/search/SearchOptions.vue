<script setup lang="ts">
import AnsweredAfterFilter from "@/components/filters/AnsweredAfterFilter.vue";
import AnsweredBeforeFilter from "@/components/filters/AnsweredBeforeFilter.vue";
import AskedAfterFilter from "@/components/filters/AskedAfterFilter.vue";
import AskedBeforeFilter from "@/components/filters/AskedBeforeFilter.vue";
import AuthorFilter from "@/components/filters/AuthorFilter.vue";
import ProgramFilter from "@/components/filters/ProgramFilter.vue";
import QuestionStateFilter from "@/components/filters/QuestionStateFilter.vue";
import SeasonFilter from "@/components/filters/SeasonFilter.vue";
import TagsFilter from "@/components/filters/TagsFilter.vue";
import type { Option } from "@/composable/types";
import type { SearchFilterOptions } from "@/composable/useSearchFilter";
import {
	type SearchSortOptions,
	type SortOptions,
	sortOptionsList,
	sortOrderList,
} from "@/composable/useSort";
import { computed } from "vue";
import { VueDraggable } from "vue-draggable-plus";

export type HideableFilter = "program" | "season";

const props = withDefaults(
	defineProps<{
		filterOptions: SearchFilterOptions;
		sortOptions: SearchSortOptions;
		hiddenFilters?: HideableFilter[];
	}>(),
	{ hiddenFilters: () => [] },
);

const isHidden = (key: HideableFilter) => props.hiddenFilters.includes(key);

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
</script>

<template>
	<Accordion multiple :value="[]">
		<AccordionPanel value="filter">
			<AccordionHeader>
				<span class="flex items-center gap-2">
					Filter
					<Badge :value="filterOptions.appliedFilterCount.value" />
				</span>
			</AccordionHeader>
			<AccordionContent>
				<div class="flex flex-col gap-3">
					<div class="flex flex-col gap-3">
						<QuestionStateFilter v-model="filterOptions.filters.state" />
						<SeasonFilter
							v-if="!isHidden('season')"
							v-model="filterOptions.filters.season"
							:options="filterOptions.seasons"
						/>
						<ProgramFilter
							v-if="!isHidden('program')"
							v-model="filterOptions.filters.program"
							:options="filterOptions.programs"
						/>
						<AuthorFilter v-model="filterOptions.filters.author" />
					</div>
					<Divider />
					<div class="flex flex-col gap-3">
						<AskedBeforeFilter v-model="filterOptions.filters.askedBefore" />
						<AskedAfterFilter v-model="filterOptions.filters.askedAfter" />
						<AnsweredBeforeFilter v-model="filterOptions.filters.answeredBefore" />
						<AnsweredAfterFilter v-model="filterOptions.filters.answeredAfter" />
					</div>
					<TagsFilter v-model="filterOptions.filters.tags" />
					<Button @click="filterOptions.clearFilters()">
						<b>Reset Filters</b>
					</Button>
				</div>
			</AccordionContent>
		</AccordionPanel>
		<AccordionPanel value="sort">
			<AccordionHeader>Sort</AccordionHeader>
			<AccordionContent>
				<div class="flex flex-col gap-3">
					<div class="flex justify-end">
						<div class="flex items-center gap-3">
							<label for="advanced_toggle">Advanced Sorting</label>
							<ToggleSwitch
								v-model="sortOptions.advancedEnabled"
								input-id="advanced_toggle"
							/>
						</div>
					</div>
					<div class="flex flex-col gap-3" v-if="!sortOptions.advancedEnabled">
						<div class="m-0">
							<label for="basic_sort_option">Sort By</label>
							<Select
								class="w-full"
								input-id="basic_sort_option"
								v-model="sortOptions.basic.sort"
								:options="sortOptionsList"
								option-label="name"
							/>
						</div>
						<div class="m-0">
							<label for="basic_sort_order">Order</label>
							<Select
								class="w-full"
								input-id="basic_sort_order"
								v-model="sortOptions.basic.asc"
								:options="sortOrderList"
								option-label="name"
							/>
						</div>
					</div>
					<div class="flex flex-col gap-3" v-else>
						<div class="flex-1">
							<label for="sort_option">Sort Option</label>
							<Select
								class="w-full"
								input-id="sort_option"
								:options="remainingAdvancedOptions"
								option-label="name"
								@update:model-value="updateSelectedAdvancedOption"
							/>
						</div>
						<VueDraggable
							ref="el"
							v-model="sortOptions.advanced"
							ghostClass="sort-ghost"
							dragClass="sort-drag"
							:animation="150"
							handle=".handle"
						>
							<div v-for="(option, index) in sortOptions.advanced">
								<div class="flex flex-wrap gap-3">
									<div class="flex flex-1 items-center">
										<div class="handle cursor-move p-2 pi pi-bars ml-2"></div>
										<span class="">{{ option.name }}</span>
									</div>
									<div class="flex flex-1 items-center gap-3">
										<div class="flex flex-1 items-center gap-3 m-0">
											<label :for="'advanced_sort_order_' + option.name">Order</label>
											<Select
												class="flex-1"
												:input-id="'advanced_sort_order_' + option.name"
												v-model="sortOptions.advanced[index].asc"
												:options="sortOrderList"
												option-label="name"
											/>
										</div>
										<Button
											class="self-end"
											type="button"
											severity="secondary"
											rounded
											outlined
											aria-label="Remove Sort"
											icon="pi pi-times"
											@click="removeSelectedAdvancedOption(index)"
										/>
									</div>
								</div>
								<Divider />
							</div>
						</VueDraggable>
					</div>
				</div>
			</AccordionContent>
		</AccordionPanel>
	</Accordion>
</template>

<style scoped>
.sort-ghost {
	opacity: 0;
}
</style>
