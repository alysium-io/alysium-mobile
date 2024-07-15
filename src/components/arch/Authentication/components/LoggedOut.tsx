import { DismissKeyboardWrapper, Icon, View } from '@atomic';
import { useTheme } from '@hooks';
import { BasePage } from '@organisms';
import React from 'react';
import { Case, Switch } from 'react-if';
import { LayoutAnimationConfig } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContinueWithPhoneBody from './ContinueWithPhoneBody';
import EnterCode from './EnterCode';

const LoggedOut = () => {
	const { theme } = useTheme();
	const insets = useSafeAreaInsets();
	const { state } = useAuthenticationAppContext();
	return (
		<BasePage>
			<LayoutAnimationConfig skipEntering>
				<DismissKeyboardWrapper>
					<View margin='m' style={{ marginTop: insets.top + theme.spacing.l }}>
						<View marginBottom='xl' alignItems='center'>
							<Icon name='logo' size='large' color='text.p' />
						</View>
						<Switch>
							<Case condition={state.screen === 'continue-phone'}>
								<ContinueWithPhoneBody />
							</Case>
							<Case condition={state.screen === 'login-phone'}>
								<EnterCode />
							</Case>
						</Switch>
					</View>
				</DismissKeyboardWrapper>
			</LayoutAnimationConfig>
		</BasePage>
	);
};

export default LoggedOut;
