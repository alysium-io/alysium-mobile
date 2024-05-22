import { ConditionalRenderer, Icon, View } from '@atomic';
import React from 'react';
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
				<ConditionalRenderer
					componentKey={state.screen}
					componentMap={{
						'continue-phone': ContinueWithPhoneBody,
						'login-phone': EnterCode
					}}
				/>
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
