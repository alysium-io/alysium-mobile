import { appActions } from '@flux/local/app';
import { Middleware } from '@reduxjs/toolkit';
import { AuthStage } from '@types';

const apiErrorUnauthorizedMiddleware: Middleware =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		/**
		 * This middlware should log the user out if the api returns a 401 error
		 */

		// Get any rejected action
		const isRejectedAction = action.type.endsWith('/rejected');

		if (isRejectedAction) {
			console.log('Rejected action');
			console.log(action.type);
			console.log(action.payload.data);
			const errorStatus = action?.payload?.status;
			if (
				// TODO: 404 is not an unauthorized error, but it's often returned when
				// we fail to find a resource (even if the real reason is that the user
				// requested access to a resource that they don't have access to).
				(errorStatus === 401 || errorStatus === 404) &&
				(getState().persistedApp.authStage === AuthStage.loggedIn ||
					getState().persistedApp.token !== null)
			) {
				console.log('Should log user out');
				dispatch(appActions.reset());
			}
		}

		return next(action);
	};

export default apiErrorUnauthorizedMiddleware;
