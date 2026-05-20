import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";
import { Route, Switch } from "wouter";
import { database, getAppData, setupDatabase } from "./database";
import { useMinisearchLoader } from "./hooks/useMinisearchLoader";
import SearchPage from "./pages/SearchPage";
import QuestionPage from "./pages/QuestionPage";
import { useAppDataStore } from "./stores/appData";

const appName = import.meta.env.VITE_APP_NAME;

export default function App() {
	const [loading, setLoading] = useState(true);
	const setAppData = useAppDataStore((s) => s.setAppData);
	const loadMinisearch = useMinisearchLoader();

	useEffect(() => {
		const startup = async () => {
			try {
				await setupDatabase();
				const data = await getAppData();
				if (data !== undefined) {
					setAppData({ seasons: data.seasons, programs: data.programs });
				}
				const questions = await database.questions.toArray();
				await loadMinisearch(questions);
			} catch (e) {
				console.error(e);
			} finally {
				setLoading(false);
			}
		};
		void startup();
	}, [setAppData, loadMinisearch]);

	if (loading) {
		return (
			<div className="h-screen-mobile flex items-center justify-center gap-4">
				<h1 className="text-xl font-semibold">{appName}</h1>
				<Spinner size="lg" />
			</div>
		);
	}

	return (
		<Switch>
			<Route path="/" component={SearchPage} />
			<Route path="/:id" component={QuestionPage} />
		</Switch>
	);
}
