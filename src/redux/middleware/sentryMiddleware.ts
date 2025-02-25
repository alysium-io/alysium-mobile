import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import {
	addBreadcrumb,
	captureException,
	withScope
} from '@sentry/react-native';

interface ErrorResponse {
	data: {
		error: string;
		message: string[];
		statusCode: number;
	};
	status: number;
}

interface RTKQueryArg {
	endpointName: string;
	originalArgs: unknown;
	queryCacheKey: string;
	type: 'query' | 'mutation';
}

interface RTKQueryMeta {
	arg: RTKQueryArg;
	requestId: string;
	requestStatus: 'rejected';
	aborted: boolean;
	condition: boolean;
	rejectedWithValue: boolean;
}

const sentryMiddleware: Middleware = () => (next) => (action) => {
	// Check if this is a rejected RTK Query action
	if (isRejectedWithValue(action)) {
		const { payload, meta, type } = action;
		const rtqMeta = meta as unknown as RTKQueryMeta;

		if (!rtqMeta.arg?.endpointName) {
			return next(action);
		}

		const errorPayload = payload as ErrorResponse;

		try {
			// Create a new Sentry event
			withScope((scope) => {
				// Add request details as tags
				scope.setTag('endpoint', rtqMeta.arg.endpointName);
				scope.setTag('request_type', rtqMeta.arg.type);
				scope.setTag('action_type', type);
				scope.setTag('status_code', errorPayload.status.toString());

				// Add additional context
				scope.setExtra('error_details', {
					error: errorPayload.data.error,
					messages: errorPayload.data.message,
					statusCode: errorPayload.data.statusCode
				});
				scope.setExtra('endpoint_details', {
					name: rtqMeta.arg.endpointName,
					cacheKey: rtqMeta.arg.queryCacheKey,
					args: rtqMeta.arg.originalArgs
				});

				// Capture the exception with the actual error messages
				const errorMessage = Array.isArray(errorPayload.data.message)
					? errorPayload.data.message.join(', ')
					: errorPayload.data.error;

				captureException(new Error(errorMessage), {
					extra: {
						originalError: errorPayload.data
					}
				});
			});

			// Add a breadcrumb for the failed request
			addBreadcrumb({
				category: 'redux-api',
				message: `API request failed: ${rtqMeta.arg.endpointName}`,
				level: 'error',
				data: {
					endpoint: rtqMeta.arg.endpointName,
					type: rtqMeta.arg.type,
					error: errorPayload.data.error,
					messages: errorPayload.data.message,
					statusCode: errorPayload.data.statusCode
				}
			});
		} catch (error) {
			// Silently handle any Sentry errors to prevent app crashes
			console.warn('Failed to send error to Sentry:', error);
		}
	}

	return next(action);
};

export default sentryMiddleware;
