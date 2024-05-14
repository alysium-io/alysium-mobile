import { Icon, View } from '@atomic';
import { useTextInput } from '@hooks';
import { TextInput } from '@molecules';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

const PhoneAuthenticationPage = () => {
	const textInputApi = useTextInput();
	return (
		<TouchableWithoutFeedback
			onPress={textInputApi.blur}
			containerStyle={styles.container}
		>
			<View height='100%' justifyContent='center'>
				<View margin='m'>
					<View marginBottom='xl' alignItems='center'>
						<Icon name='logo' size='large' color='t2' />
					</View>
					<TextInput
						placeholder='Phone number'
						keyboardType='phone-pad'
						textContentType='telephoneNumber'
						textInputApi={textInputApi}
						onChangeText={(text) => textInputApi.setText(text)}
						icon='phone'
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	container: {
		height: '100%',
		width: '100%'
	}
});

export default PhoneAuthenticationPage;
