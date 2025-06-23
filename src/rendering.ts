import type { Question } from "@qnaplus/scraper";
import {
	type Node as ParserNode,
	Text as TextNode,
	isTag,
	isText,
} from "domhandler";
import { parseDocument } from "htmlparser2";
import sanitize from "sanitize-html";
import Blockquote from "./components/question/Blockquote.vue";
import Code from "./components/question/Code.vue";
import Emphasis from "./components/question/Emphasis.vue";
import Header from "./components/question/Header.vue";
import Image from "./components/question/Image.vue";
import Link from "./components/question/Link.vue";
import ListItem from "./components/question/ListItem.vue";
import Mark from "./components/question/Mark.vue";
import OrderedList from "./components/question/OrderedList.vue";
import Paragraph from "./components/question/Paragraph.vue";
import Pre from "./components/question/Pre.vue";
import Strong from "./components/question/Strong.vue";
import Text from "./components/question/Text.vue";
import UnorderedList from "./components/question/UnorderedList.vue";

const HEADER_REGEX = /h[1-6]/;

export type QuestionComponentNode = ReturnType<
	typeof resolveQuestionComponentNode
>;

export const resolveQuestionComponentNode = (node: ParserNode) => {
	switch (true) {
		case isTag(node) && node.name === "img":
			return Image;
		case isTag(node) && node.name === "p":
			return Paragraph;
		case isTag(node) && node.name === "a":
			return Link;
		case isTag(node) && node.name === "strong":
			return Strong;
		case isTag(node) && node.name === "em":
			return Emphasis;
		case isTag(node) && node.name === "br":
			return "br";
		case isTag(node) && node.name === "blockquote":
			return Blockquote;
		case isTag(node) && node.name === "ol":
			return OrderedList;
		case isTag(node) && node.name === "ul":
			return UnorderedList;
		case isTag(node) && node.name === "li":
			return ListItem;
		case isTag(node) && node.name === "code":
			return Code;
		case isTag(node) && node.name === "pre":
			return Pre;
		case isTag(node) && node.name === "mark":
			return Mark;
		case isTag(node) && HEADER_REGEX.test(node.name):
			return Header;
		case node instanceof TextNode:
			return Text;
	}
};

export type QuestionComponentProps = ReturnType<
	typeof resolveQuestionComponentProps
>;

export const resolveQuestionComponentProps = (node: ParserNode) => {
	if (isTag(node) && node.name === "img") {
		return { src: node.attribs.src, height: 250, preview: true };
	}
	if (
		isTag(node) &&
		[
			"em",
			"p",
			"strong",
			"blockquote",
			"li",
			"pre",
			"code",
			"ul",
			"mark",
		].includes(node.name)
	) {
		return { children: node.children };
	}
	if (isTag(node) && HEADER_REGEX.test(node.name)) {
		return { header: node.name, children: node.children };
	}
	if (isTag(node) && node.name === "a") {
		return { href: node.attribs.href, children: node.children };
	}
	if (isTag(node) && node.name === "ol") {
		return {
			start: Number.parseInt(node.attribs.start ?? "1"),
			children: node.children,
		};
	}
	if (isText(node)) {
		return { text: node.data };
	}
	return {};
};

export type QuestionComponentSize = ReturnType<
	typeof resolveQuestionComponentSize
>;

export const resolveQuestionComponentSize = (node: ParserNode): number => {
	if (isTag(node) && node.name === "img") {
		return 250;
	}
	if (
		isTag(node) &&
		[
			"em",
			"p",
			"strong",
			"blockquote",
			"ol",
			"li",
			"a",
			"pre",
			"code",
			"ul",
			"mark",
		].includes(node.name)
	) {
		return node.children.reduce<number>(
			(size, child) => size + resolveQuestionComponentSize(child),
			0,
		);
	}
	if (isTag(node) && HEADER_REGEX.test(node.name)) {
		return node.children.reduce<number>(
			(size, child) => size + resolveQuestionComponentSize(child),
			0,
		);
	}
	if (isText(node)) {
		return node.data.split(" ").length;
	}
	return 0;
};

export interface ResolvedComponent {
	node: QuestionComponentNode;
	props: QuestionComponentProps;
	size: QuestionComponentSize;
}

export const resolveQuestionComponent = (
	node: ParserNode,
): ResolvedComponent => {
	return {
		node: resolveQuestionComponentNode(node),
		props: resolveQuestionComponentProps(node),
		size: resolveQuestionComponentSize(node),
	};
};

export interface RenderQuestionOptions {
	limit?: number;
}

export const renderQuestion = (
	question: Question | undefined,
	opts?: RenderQuestionOptions,
) => {
	if (question === undefined) {
		return {
			questionContent: [],
			answerContent: [],
		};
	}
	const limit = opts?.limit ?? Number.POSITIVE_INFINITY;

	const allowedAttributes = {
		...sanitize.defaults.allowedAttributes,
		ol: ["start"],
	};
	const sanitizeOptions: sanitize.IOptions = {
		allowedTags: sanitize.defaults.allowedTags.concat("img"),
		allowedAttributes,
	};

	const sanitizedQuestionHTML = sanitize(question.questionRaw, sanitizeOptions);
	const questionDom = parseDocument(sanitizedQuestionHTML);
	const questionChildren = questionDom.children as ParserNode[];

	const sanitizedAnswerHTML = sanitize(
		question.answerRaw ?? "",
		sanitizeOptions,
	);
	const answerDom = parseDocument(sanitizedAnswerHTML);
	const answerChildren = answerDom.children as ParserNode[];

	let truncated = false;
	let questionSize = 0;
	const questionContent: ResolvedComponent[] = [];
	for (const node of questionChildren) {
		if (questionSize >= limit) {
			truncated = true;
			break;
		}
		const component = resolveQuestionComponent(node);
		questionContent.push(component);
		questionSize += component.size;
	}

	let answerSize = 0;
	const answerContent: ResolvedComponent[] = [];
	for (const node of answerChildren) {
		if (truncated || answerSize >= limit) {
			truncated = true;
			break;
		}
		const component = resolveQuestionComponent(node);
		answerContent.push(component);
		answerSize += component.size;
	}

	return { questionContent, answerContent };
};
