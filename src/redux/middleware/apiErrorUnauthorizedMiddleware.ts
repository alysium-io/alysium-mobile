import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { AuthStage } from '@types';

const apiErrorUnauthorizedMiddleware: Middleware =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		// Check if this is a rejected RTK Query action
		if (isRejectedWithValue(action)) {
			console.log('Rejected RTK Query action:', action.type);
			console.log('Error payload:', action.payload);

			if (action.payload?.data?.error === 'UNIQUE_CONSTRAINT_EXCEPTION') {
				console.log('Unique constraint exception detected');
			}

			const errorStatus = action.payload?.status;
			if (
				(errorStatus === 401 || errorStatus === 404) &&
				(getState().persistedApp.authStage === AuthStage.loggedIn ||
					getState().persistedApp.token !== null)
			) {
				console.log('Unauthorized error detected');
			}
		}

		// Always call next(action) to ensure the action continues through the middleware chain
		return next(action);
	};

export default apiErrorUnauthorizedMiddleware;
