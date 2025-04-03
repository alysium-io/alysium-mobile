import { Loading } from '@atomic';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { usePersistedAppState, withProvider } from '@hooks';
import { BasePage } from '@organisms';
import { AuthStage, ChildrenProps } from '@types';
import React from 'react';
import { AuthenticationAppProvider } from './Authentication.context';
import AuthenticationApp from './AuthenticationApp';

const Authentication: React.FC<ChildrenProps> = ({ children }) => {
	const { authStage } = usePersistedAppState();

	if (authStage === AuthStage.loggedOut) {
		return <AuthenticationApp />;
	}

	if (authStage === AuthStage.loading) {
		return (
			<BasePage>
				<Loading />
			</BasePage>
		);
	}

	return children;
};

export default withProvider(Authentication, [
	BottomSheetModalProvider,
	AuthenticationAppProvider
]);
