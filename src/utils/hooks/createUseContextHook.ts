import { Context, useContext } from 'react';

// This is a generic hook that takes a context object and returns the context value.
// It also ensures that the context is not undefined, throwing an error if it is not properly initialized.
function createUseContextHook<T>(context: Context<T>, contextName: string) {
	return (): T => {
		const contextValue = useContext(context);
		if (!contextValue) {
			throw new Error(
				`${contextName} must be used within a corresponding Provider`
			);
		}
		return contextValue;
	};
}

export default createUseContextHook;
