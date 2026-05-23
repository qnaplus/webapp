/**
 * Truncates an HTML string to a maximum text character length while keeping
 * tags properly closed. This provides a better proxy for visual line count
 * since block elements wrap based on content length.
 */
export function truncateHtml(html: string, maxChars: number): string {
	let textLen = 0;
	let result = "";
	const openTags: string[] = [];
	let i = 0;

	while (i < html.length && textLen < maxChars) {
		if (html[i] === "<") {
			const tagEnd = html.indexOf(">", i);
			if (tagEnd === -1) break;

			const tag = html.slice(i, tagEnd + 1);
			const tagNameMatch = tag.match(/^<\/?(\w+)/);
			const tagName = tagNameMatch ? tagNameMatch[1].toLowerCase() : "";

			result += tag;

			if (tag.startsWith("</")) {
				openTags.pop();
			} else if (!tag.endsWith("/>") && !isVoidTag(tagName)) {
				openTags.push(tagName);
			}

			i = tagEnd + 1;
		} else {
			result += html[i];
			textLen++;
			i++;
		}
	}

    if (openTags.length !== 0) {
        result += " [...]";
    }

	// Close any remaining open tags
	while (openTags.length > 0) {
		result += `</${openTags.pop()}>`;
	}

	return result;
}

const VOID_TAGS = new Set([
	"area", "base", "br", "col", "embed", "hr", "img",
	"input", "link", "meta", "source", "track", "wbr",
]);

function isVoidTag(tagName: string): boolean {
	return VOID_TAGS.has(tagName);
}
