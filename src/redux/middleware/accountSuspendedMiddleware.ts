import { serviceApi } from '@flux/api/base';
import { persistedAppSlice } from '@flux/local/persisted-app';
import { Middleware, isRejectedWithValue } from '@reduxjs/toolkit';
import { AuthStage } from '@types';
import Toast from 'react-native-toast-message';

const accountSuspendedMiddleware: Middleware =
	({ dispatch }) =>
	(next) =>
	(action) => {
		// Check if this is a rejected RTK Query action
		if (isRejectedWithValue(action)) {
			const payload = action.payload as any;
			const error = payload?.data?.error;

			// Check if this is our suspended exception
			if (error === 'SUSPENDED_EXCEPTION') {
				// Reset the API state (i.e. logout the user)
				dispatch(serviceApi.util.resetApiState());
				dispatch(
					persistedAppSlice.actions.setWithDefaults({
						authStage: AuthStage.loggedOut,
						token: null
					})
				);

				Toast.show({
					text1: 'Error',
					text2: 'Your account has been suspended.'
				});
			}
		}

		// Always call next(action) to ensure the action continues through the middleware chain
		return next(action);
	};

export default accountSuspendedMiddleware;
