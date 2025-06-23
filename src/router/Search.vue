<script setup lang="ts">
import { database } from "../database";

import SearchableQuestions from "../components/shared/SearchableQuestions.vue";
import Root from "./Root.vue";

const querier = () => database.questions.toArray();
</script>

<template>
    <Root>
        <SearchableQuestions :querier="querier" />
    </Root>
</template>

<style></style>