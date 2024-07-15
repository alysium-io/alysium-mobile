import { useUserAppContext } from '@arch/Application/contexts/User.context';
import { View } from '@atomic';
import { UpdateUserBodyDto } from '@flux/api/user/dto/user-update.dto';
import { TextInputApi } from '@hooks';
import { TextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface EditHandleProps {
	formMethods: UseFormReturn<UpdateUserBodyDto>;
	handleTextInputApi: TextInputApi;
}

const EditHandle: React.FC<EditHandleProps> = ({
	formMethods,
	handleTextInputApi
}) => {
	const { userData } = useUserAppContext();
	return (
		<View margin='m'>
			<Controller
				name='handle'
				control={formMethods.control}
				rules={{ required: 'Handle is required' }}
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
