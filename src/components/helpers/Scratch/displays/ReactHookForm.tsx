import { FormText } from '@molecules';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, TextInput, View } from 'react-native';

interface FormData {
	name: string;
	phoneNumber: string;
	email: string;
	role: string;
}

const FormWithDirtyState = () => {
	const {
		control,
		formState: { isDirty, dirtyFields }
	} = useForm<FormData>({
		defaultValues: {
			name: 'John Doe',
			phoneNumber: '555-123-4567',
			email: 'john.doe@example.com',
			role: 'Developer'
		}
	});

	// Effect to monitor form dirtiness
	useEffect(() => {
		if (isDirty) {
			console.log('Form is dirty');
			console.log('Dirty fields:', dirtyFields);
			// Here you can trigger any actions based on dirty state
		} else {
			console.log('Form is clean');
		}
	}, [isDirty, dirtyFields]);

	return (
		<View style={styles.screen}>
			<View style={styles.container}>
				<Controller
					control={control}
					name='name'
					rules={{ required: true }}
					render={({ field: { onChange, value, onBlur } }) => (
						<FormText
							label='hi'
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder='Name'
						/>
					)}
				/>

				<Controller
					control={control}
					name='phoneNumber'
					rules={{ required: true }}
					render={({ field: { onChange, value, onBlur } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder='Phone Number'
							keyboardType='phone-pad'
						/>
					)}
				/>

				<Controller
					control={control}
					name='email'
					rules={{
						required: true,
						pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
					}}
					render={({ field: { onChange, value, onBlur } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder='Email'
							keyboardType='email-address'
							autoCapitalize='none'
						/>
					)}
				/>

				<Controller
					control={control}
					name='role'
					rules={{ required: true }}
					render={({ field: { onChange, value, onBlur } }) => (
						<TextInput
							style={styles.input}
							onBlur={onBlur}
							onChangeText={onChange}
							value={value}
							placeholder='Role'
						/>
					)}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#fff'
	},
	container: {
		padding: 20,
		gap: 10,
		width: '100%'
	},
	input: {
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		borderRadius: 5,
		paddingHorizontal: 10
	}
});

export default FormWithDirtyState;
