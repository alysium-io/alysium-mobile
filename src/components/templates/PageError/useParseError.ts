import { PageErrorType } from './types';

interface IUseParseError {}

const useParseError = (error: any): IUseParseError => {
	const status = error?.status;

	if (status === undefined) {
		return PageErrorType.UNKNOWN;
	}

	if (status === 404) {
		return PageErrorType.NOT_FOUND;
	}

	if (status === 500) {
		return PageErrorType.SERVER_ERROR;
	}

	if (status === 401) {
		return PageErrorType.UNAUTHORIZED;
	}

	if (status === 403) {
		return PageErrorType.FORBIDDEN;
	}

	if (status === 400) {
		return PageErrorType.BAD_REQUEST;
	}

	return PageErrorType.UNKNOWN;
};

export default useParseError;
