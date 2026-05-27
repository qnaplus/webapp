export type TrySuccess<T> = [null, T];
export type TryFailure<E> = [E, null];
export type TryResult<T, E = Error> = TrySuccess<T> | TryFailure<E>;

export async function trycatch<T>(promise: () => Promise<T>): Promise<TryResult<T, Error>> {
	try {
		const result = await promise();
		return [null, result];
	} catch (e) {
		return [e as Error, null];
	}
};
