import { View } from '@atomic';
import { HeaderWithBackButton } from '@templates';
import React from 'react';
import MainText from './components/MainText';
import { PageErrorType } from './types';
import useParseError from './useParseError';

interface PageErrorProps {
	error: any;
	withHeader?: boolean;
}

const PageError: React.FC<PageErrorProps> = ({ error, withHeader = true }) => {
	const pageErrorType = useParseError(error);

	if (pageErrorType === PageErrorType.NOT_FOUND) {
		return (
			<View flex={1}>
				{withHeader && <HeaderWithBackButton />}
				<MainText title='Error 404' description='Page not found' />
			</View>
		);
	}

	if (pageErrorType === PageErrorType.SERVER_ERROR) {
		return (
			<View flex={1}>
				{withHeader && <HeaderWithBackButton />}
				<MainText title='Error 500' description='Server error' />
			</View>
		);
	}

	if (pageErrorType === PageErrorType.UNAUTHORIZED) {
		return (
			<View flex={1}>
				{withHeader && <HeaderWithBackButton />}
				<MainText title='Error 401' description='Unauthorized' />
			</View>
		);
	}

	if (pageErrorType === PageErrorType.FORBIDDEN) {
		return (
			<View flex={1}>
				{withHeader && <HeaderWithBackButton />}
				<MainText title='Error 403' description='Forbidden' />
			</View>
		);
	}

	if (pageErrorType === PageErrorType.BAD_REQUEST) {
		return (
			<View flex={1}>
				{withHeader && <HeaderWithBackButton />}
				<MainText title='Error 400' description='Bad Request' />
			</View>
		);
	}

	return (
		<View flex={1}>
			{withHeader && <HeaderWithBackButton />}
			<MainText title='Error 500' description='Unknown error' />
		</View>
	);
};

export default PageError;
