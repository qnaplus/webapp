<script setup lang="ts">
import { database } from "../database";

import SearchableQuestions from "../components/shared/SearchableQuestions.vue";
import Root from "./Root.vue";

const querier = () => database.questions.filter(q => q.bookmarked).toArray()

</script>

<template>
    <Root>
        <h1 class="prose-invert prose-slate text-2xl px-4 font-bold">Bookmarks</h1>
        <SearchableQuestions :querier="querier" />
    </Root>
</template>

<style></style>