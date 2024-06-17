import { View } from '@atomic';
import { CreateHostBodyDto } from '@flux/api/host/dto/host-create.dto';
import { TextInputApi } from '@hooks';
import { EditableTextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface HostNameProps {
	formMethods: UseFormReturn<CreateHostBodyDto>;
	hostNameTextInputApi: TextInputApi;
}

const HostName: React.FC<HostNameProps> = ({
	formMethods,
	hostNameTextInputApi
}) => {
	return (
		<View margin='m'>
			<Controller
				name='name'
				control={formMethods.control}
				rules={{ required: 'Host name is required' }}
				render={({ field: { value, onChange } }) => (
					<EditableTextInputWithLabel
						label='Host Name'
						placeholder='Daisy Chain, EDX Nightclub, etc.'
						textInputApi={hostNameTextInputApi}
						onChangeText={onChange}
						value={value}
					/>
				)}
			/>
		</View>
	);
};

export default HostName;
