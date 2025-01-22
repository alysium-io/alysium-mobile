// This is not actually implemented anywhere, but I'll leave it here as a good proof-of-concept.

/**
 * The purpose of this was to create an intermediate function between the `data` object passed
 * by the auto-generated RTK Query hook and the `data` object that is returned by the hook.
 *
 * This allows us to transform the `data` object in any way we want, and return it as a new object
 * that is not just the `data` object.
 */

type QueryHook<TArgs, TData> = (args: TArgs) => {
	data?: TData;
	[key: string]: any;
};

type TransformFn<TInput, TOutput> = (
	data: TInput | undefined
) => TOutput | undefined;

export function createTransformedHook<
	THook extends QueryHook<any, any>,
	TInput = ReturnType<THook>['data'],
	TOutput = any
>(
	baseHook: THook,
	transform: TransformFn<TInput, TOutput>
): (
	args: Parameters<THook>[0]
) => Omit<ReturnType<THook>, 'data'> & { data: TOutput | undefined } {
	return (
		args
	): Omit<ReturnType<THook>, 'data'> & { data: TOutput | undefined } => {
		const { data, ...rest } = baseHook(args) as ReturnType<THook>;
		return {
			...rest,
			data: transform(data)
		};
	};
}

// Example of how to use the createTransformedHook function
// export const useFindOneEvent = createTransformedHook(
// 	api.useFindOneEventQuery,
// 	(data) => (data ? new EventLinkModel(data) : undefined)
// );
