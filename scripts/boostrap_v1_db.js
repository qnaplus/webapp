const openDatabase = () => {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open("qnaplus", 1);

		request.onupgradeneeded = () => {
			const db = request.result;
			db.createObjectStore("questions", { keyPath: "id" });
			db.createObjectStore("metadata", { keyPath: "id" });
			db.createObjectStore("appdata", { keyPath: "id" });
		};

		request.onsuccess = () => resolve(request.result);
		request.onerror = () => reject(request.error);
	});
};

const bootstrapDatabase = async () => {
	const db = await openDatabase();

	const transaction = db.transaction(
		["questions", "metadata", "appdata"],
		"readwrite",
	);
	const questionsStore = transaction.objectStore("questions");
	const metadataStore = transaction.objectStore("metadata");
	const appdataStore = transaction.objectStore("appdata");

	await new Promise((resolve, reject) => {
		const request = metadataStore.put({
			id: "0",
			lastUpdated: new Date().getTime(),
		});
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});

	await new Promise((resolve, reject) => {
		const request = questionsStore.put({
			id: "0",
			season: "2021-01",
			program: "Program A",
			question: "Question 1",
		});
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});

	await new Promise((resolve, reject) => {
		const request = appdataStore.put({
			id: "0",
			seasons: ["2021-01", "2021-02"],
			programs: ["Program A", "Program B"],
		});
		request.onsuccess = () => resolve();
		request.onerror = () => reject(request.error);
	});

	console.log("Database bootstrapped with version 1 data");

	db.close();
};

bootstrapDatabase().catch((e) => {
	console.error("Failed to bootstrap database:", e);
});
