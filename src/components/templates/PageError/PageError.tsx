import React from 'react';
import BadRequest from './pages/BadRequest';
import ErrorNotFound from './pages/ErrorNotFound';
import Forbidden from './pages/Forbidden';
import ServerError from './pages/ServerError';
import Unauthorized from './pages/Unauthorized';
import Unknown from './pages/Unknown';
import { PageErrorType } from './types';
import useParseError from './useParseError';

interface PageErrorProps {
	error: any;
}

const PageError: React.FC<PageErrorProps> = ({ error }) => {
	const pageErrorType = useParseError(error);

	if (pageErrorType === PageErrorType.NOT_FOUND) {
		return <ErrorNotFound />;
	}

	if (pageErrorType === PageErrorType.SERVER_ERROR) {
		return <ServerError />;
	}

	if (pageErrorType === PageErrorType.UNAUTHORIZED) {
		return <Unauthorized />;
	}

	if (pageErrorType === PageErrorType.FORBIDDEN) {
		return <Forbidden />;
	}

	if (pageErrorType === PageErrorType.BAD_REQUEST) {
		return <BadRequest />;
	}

	return <Unknown />;
};

export default PageError;
