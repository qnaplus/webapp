import type { Question } from "@qnaplus/scraper";
import Dexie, { type EntityTable } from "dexie";

const DATA_PRIMARY_KEY = "0";
const DEFAULT_VERSION = "_";

export interface QnaplusAppData {
	id: string;
	seasons: string[];
	programs: string[];
}

export interface QnaplusMetadata {
	id: string;
	version: string;
}

interface QnaplusDatabase extends Dexie {
	questions: EntityTable<Question, "id">;
	metadata: EntityTable<QnaplusMetadata, "id">;
	appdata: EntityTable<QnaplusAppData, "id">;
}

export const database = new Dexie("qnaplus", {
	autoOpen: true,
}) as QnaplusDatabase;

database.version(1).stores({
	questions: "id",
	metadata: "id",
	appdata: "id",
});

database.version(2).upgrade((tx) => {
	tx.table("metadata").toCollection().modify(metadata => {
		metadata.version = DEFAULT_VERSION;
		delete metadata.lastUpdated;
	})
})

const updateAppData = async (db: QnaplusDatabase) => {
	const questions = await db.questions.toArray();
	const seasons = questions
		.map((q) => q.season)
		.sort(
			(a, b) =>
				Number.parseInt(b.split("-")[1]) - Number.parseInt(a.split("-")[1]),
		)
		.filter((season, index, array) => array.indexOf(season) === index);
	const programs = questions
		.map((q) => q.program)
		.filter((program, index, array) => array.indexOf(program) === index);
	await db.appdata.put({ id: DATA_PRIMARY_KEY, seasons, programs });
};

type UpdateResponseOutdated = {
	outdated: true;
	version: string;
	questions: Question[];
}

type UpdateResponseUpToDate = {
	outdated: false;
}

type UpdateResponse = UpdateResponseOutdated | UpdateResponseUpToDate;

const update = async (db: QnaplusDatabase) => {
	const metadata = await getMetadata(db);
	const response = await fetch(`${import.meta.env.VITE_QNAPLUS_API}/internal/update?version=${metadata.version}`);
	if (response.status === 500) {
		console.error(response.status, response.statusText);
		return;
	}
	const updateResponse = (await response.json()) as UpdateResponse;
	if (!updateResponse.outdated) {
		return;
	}
	const { questions, version } = updateResponse;
	await db.questions.bulkPut(questions);
	await db.metadata.put({ id: DATA_PRIMARY_KEY, version });
	await updateAppData(db);
};

export const setupDatabase = async () => {
	return new Promise<void>((resolve, reject) => {
		database.open().catch((e) => reject(e));
		database.on("ready", async (db) => {
			await update(db as QnaplusDatabase);
			resolve();
		});
	});
};

export const getMetadata = async (db: QnaplusDatabase): Promise<QnaplusMetadata> => {
	const metadata = await db.metadata.get(DATA_PRIMARY_KEY);
	if (metadata !== undefined) {
		return metadata;
	}
	return { id: DATA_PRIMARY_KEY, version: DEFAULT_VERSION }
};

export const getAppData = async () => {
	const data = await database.appdata.get(DATA_PRIMARY_KEY);
	if (data === undefined) {
		// TODO: replace with better logging
		console.warn("warning, app data is undefined");
	}
	return data;
};

export const getQuestion = async (id: string) => {
	const localQuestion = await database.questions.get(id);
	return localQuestion;
};
