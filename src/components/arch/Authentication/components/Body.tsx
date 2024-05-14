import { ConditionalRenderer, Icon, View } from '@atomic';
import React from 'react';
import { Keyboard, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useAuthenticationAppContext } from '../Authentication.context';
import ContinueWithPhoneBody from './ContinueWithPhoneBody';
import EnterCode from './EnterCode';

const Body: React.FC = () => {
	const { state } = useAuthenticationAppContext();

	return (
		<TouchableWithoutFeedback
			onPress={() => Keyboard.dismiss()}
			containerStyle={styles.container}
		>
			<View height='100%' justifyContent='center'>
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
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default Body;
