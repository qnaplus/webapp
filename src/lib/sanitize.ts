import sanitize from "sanitize-html";

const sanitizeOptions: sanitize.IOptions = {
	allowedTags: sanitize.defaults.allowedTags.concat(["img", "mark"]),
	allowedAttributes: {
		...sanitize.defaults.allowedAttributes,
		ol: ["start"],
		img: ["src", "alt"],
	},
};

export const cleanQuestionHtml = (raw: string | null | undefined): string => {
	if (raw === null || raw === undefined || raw === "") {
		return "";
	}
	return sanitize(raw, sanitizeOptions);
};
