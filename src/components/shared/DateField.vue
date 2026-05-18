<script setup lang="ts">
import { CalendarDate } from "@internationalized/date";
import { computed } from "vue";

defineProps<{
	inputId?: string;
	ariaLabel?: string;
}>();

const value = defineModel<Date | null>();

const internalValue = computed<CalendarDate | null>({
	get() {
		const v = value.value;
		if (!v) return null;
		return new CalendarDate(v.getFullYear(), v.getMonth() + 1, v.getDate());
	},
	set(v) {
		if (!v) {
			value.value = null;
			return;
		}
		value.value = v.toDate("UTC");
	},
});
</script>

<template>
    <UInputDate
        :id="inputId"
        v-model="internalValue"
        :aria-label="ariaLabel"
        icon="i-lucide-calendar"
        class="w-full"
    />
</template>
