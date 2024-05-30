import { Icon, View } from '@atomic';
import React from 'react';
import { Case, Switch } from 'react-if';
import { Keyboard, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContinueWithPhoneBody from './ContinueWithPhoneBody';
import EnterCode from './EnterCode';

const Body: React.FC = () => {
	const insets = useSafeAreaInsets();
	const { state } = useAuthenticationAppContext();

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			containerStyle={[styles.container, { marginTop: insets.top }]}
		>
			<View margin='m'>
				<View marginBottom='xl' alignItems='center'>
					<Icon name='logo' size='large' color='t1' />
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
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center'
	}
});

export default Body;
