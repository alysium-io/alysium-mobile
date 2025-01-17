import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';

const apiErrorUnauthorizedMiddleware: Middleware =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		// Check if this is a rejected RTK Query action
		if (isRejectedWithValue(action)) {
			// Get the name of the endpoint that was called
			const endpointName = (action.meta.arg as any)?.endpointName ?? 'unknown';
			console.log(`Rejected RTK Query action {${endpointName}}:`, action.type);
			console.log('Error payload:', action.payload);
		}

		// Always call next(action) to ensure the action continues through the middleware chain
		return next(action);
	};

export default apiErrorUnauthorizedMiddleware;
