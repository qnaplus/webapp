export const DEFAULT_PROGRAM = "VURC";

export const paths = {
	home: "/",
	all: "/all",
	qa: (program: string, season: string) => `/${program}/${season}/QA`,
	question: (id: string) => `/${id}`,
} as const;
