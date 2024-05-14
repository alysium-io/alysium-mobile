import { Icon, View } from '@atomic';
import { userApiSlice } from '@flux/api/user';
import { Button, LargeTextInput } from '@molecules';
import React, { useState } from 'react';
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { FadeIn, FadeOut } from 'react-native-reanimated';

interface CreateAccountProps {
	toggleAuthScreen: () => void;
}

const CreateAccount: React.FC<CreateAccountProps> = ({ toggleAuthScreen }) => {
	const [email, setEmail] = useState<string>('');
	const [name, setName] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const [createAccount] = userApiSlice.useCreateMutation();

	return (
		<View
			animated
			entering={FadeIn.duration(350)}
			exiting={FadeOut.duration(350)}
			flex={1}
		>
			<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
				<View flex={1}>
					<View style={styles.container} margin='m'>
						<View marginBottom='m'>
							<Icon name='logo' size='xlarge' color='bg3' />
						</View>
						<LargeTextInput
							defaultValue={name}
							placeholder='Username'
							onChangeText={(text) => setName(text)}
							containerProps={{ marginBottom: 'm' }}
							icon='at'
						/>
						<LargeTextInput
							defaultValue={email}
							placeholder='Email'
							onChangeText={(text) => setEmail(text)}
							containerProps={{ marginBottom: 'm' }}
							icon='profile'
						/>
						<LargeTextInput
							defaultValue={password}
							placeholder='Password'
							onChangeText={(text) => setPassword(text)}
							secureTextEntry
							icon='lock'
						/>
					</View>
					<View style={styles.footer} padding='m'>
						<View marginBottom='m'>
							<Button
								variant='outlined'
								text='Use Existing Account'
								onPress={toggleAuthScreen}
							/>
						</View>
						<Button
							text='Create Account'
							onPress={() => createAccount({ body: { name, email, password } })}
							colorVariant='negative'
						/>
					</View>
				</View>
			</TouchableWithoutFeedback>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	footer: {
		position: 'absolute',
		bottom: 25,
		width: '100%'
	}
});

export default CreateAccount;
