<script setup lang="ts">
import { provide, ref } from "vue";
import { loadMinisearch } from "./composable/useSearch";
import {
	type QnaplusAppData,
	database,
	getAppData,
	setupDatabase,
} from "./database";

const loading = ref<boolean>(true);
const appdata = ref<QnaplusAppData>();
provide("appdata", appdata);

const appname = import.meta.env.VITE_APP_NAME;

const startup = async () => {
	try {
		await setupDatabase();

		const data = await getAppData();
		appdata.value = data;

		const questions = await database.questions.toArray();
		await loadMinisearch(questions);
	} catch (e) {
		console.error(e);
	} finally {
		loading.value = false;
	}
};

startup();
</script>

<template>
	<UApp>
		<div v-if="loading" class="flex flex-row h-screen-mobile justify-center items-center gap-x-4">
			<h1 class="text-xl font-semibold">{{ appname }}</h1>
			<UIcon name="i-lucide-loader-circle" class="size-10 animate-spin text-primary" />
		</div>
		<UMain v-else>
			<Suspense>
				<router-view class="w-full"></router-view>
			</Suspense>
		</UMain>
	</UApp>
</template>

<style>
@import "./styles.css";
</style>
