type Props = {
	results: number;
};

export default function QuestionListHeader({ results }: Props) {
	return (
		<div className="flex justify-between py-3">
			<span className="text-sm">
				{results} {results === 1 ? "result" : "results"}
			</span>
		</div>
	);
}
