<script lang="ts">
import { Question } from '@qnaplus/scraper';
import Drawer from 'primevue/drawer';


defineProps<{
    visible: boolean;
    question: Question;
}>();
</script>


<template>
    <Drawer v-model:visible=""/>
</template>

<style>
</style>
