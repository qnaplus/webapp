<script setup lang="ts">
defineProps<{
	src: string;
	height: number;
	preview: boolean;
}>();
</script>

<template>
    <div>
        <ProseImg :src="src" alt="" :width="height" :zoom="preview" />
    </div>
</template>
