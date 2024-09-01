import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { View } from '@atomic';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { TextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EditHandleProps {
	formMethods: UseFormReturn<UpdateUserBodyDto>;
}

const EditHandle: React.FC<EditHandleProps> = ({ formMethods }) => {
	const { userData } = useUserAppContext();
	return (
		<View margin='m'>
			<Controller
				name='handle'
				control={formMethods.control}
				rules={{
					required: 'Handle is required',
					minLength: {
						value: 3,
						message: 'Handle must be at least 3 characters long'
					},
					pattern: {
						value: /^[a-zA-Z0-9_]+$/,
						message: 'Handle can only contain letters, numbers, and underscores'
					},
					validate: (value) =>
						value.length >= 3 || 'Handle must be at least 3 characters long'
				}}
				render={({ field: { onChange } }) => (
					<TextInputWithLabel
						label='Handle'
						placeholder={userData.handle}
						onChangeText={onChange}
					/>
				)}
			/>
		</View>
	);
};

export default EditHandle;
