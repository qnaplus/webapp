import {
	type Node as ParserNode,
	Text as TextNode,
	isTag,
	isText,
} from "domhandler";
import Blockquote from "../components/question/Blockquote.vue";
import Emphasis from "../components/question/Emphasis.vue";
import Image from "../components/question/Image.vue";
import Link from "../components/question/Link.vue";
import ListItem from "../components/question/ListItem.vue";
import OrderedList from "../components/question/OrderedList.vue";
import Paragraph from "../components/question/Paragraph.vue";
import Strong from "../components/question/Strong.vue";
import Text from "../components/question/Text.vue";
import Code from "../components/question/Code.vue";
import Pre from "../components/question/Pre.vue";
import UnorderedList from "../components/question/UnorderedList.vue";
import Mark from "../components/question/Mark.vue";
import Header from "../components/question/Header.vue";

export interface ResolvedComponent {
	node: ReturnType<typeof resolveQuestionComponentNode>;
	props: ReturnType<typeof resolveQuestionComponentProps>;
	size: ReturnType<typeof resolveQuestionComponentSize>;
}

const HEADER_REGEX = /h[1-6]/

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

export const resolveQuestionComponentProps = (node: ParserNode) => {
	if (isTag(node) && node.name === "img") {
		return { src: node.attribs.src, height: 250, preview: true };
	}
	if (
		isTag(node) &&
		["em", "p", "strong", "blockquote", "li", "pre", "code", "ul", "mark"].includes(node.name)
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
		return { start: Number.parseInt(node.attribs.start ?? "1"), children: node.children };
	}
	if (isText(node)) {
		return { text: node.data };
	}
	return {};
};

export const resolveQuestionComponentSize = (node: ParserNode): number => {
	if (isTag(node) && node.name === "img") {
		return 250;
	}
	if (
		isTag(node) &&
		["em", "p", "strong", "blockquote", "ol", "li", "a", "pre", "code", "ul", "mark"].includes(node.name)
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

export const resolveQuestionComponent = (
	node: ParserNode,
): ResolvedComponent => {
	return {
		node: resolveQuestionComponentNode(node),
		props: resolveQuestionComponentProps(node),
		size: resolveQuestionComponentSize(node),
	};
};
