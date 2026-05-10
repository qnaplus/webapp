import {
	type RouteRecordRaw,
	createRouter,
	createWebHistory,
} from "vue-router";

import Question from "./Question.vue";
import Search from "./Search.vue";
import { paths } from "./routes";

const routes: RouteRecordRaw[] = [
	{
		path: paths.home,
		redirect: paths.all,
	},
	{
		path: paths.all,
		component: Search,
	},
	{
		path: "/:program/:season/QA",
		component: Search,
		props: true,
	},
	{
		path: "/:id",
		component: Question,
		props: true,
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
	scrollBehavior(_to, _from, savedPosition) {
		if (savedPosition) {
			return new Promise((resolve) => {
				setTimeout(() => {
					resolve({ left: 0, top: savedPosition.top, behavior: "instant" });
				}, 200);
			});
		}
	},
});
