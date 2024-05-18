import { View } from '@atomic';
import { CreateVenueBodyDto } from '@flux/api/venue/dto/venue-create.dto';
import { TextInputApi } from '@hooks';
import { TextInput } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface VenueNameProps {
	formMethods: UseFormReturn<CreateVenueBodyDto>;
	textInputApi: TextInputApi;
	setVenueName: (text: string) => void;
}

const VenueName: React.FC<VenueNameProps> = ({
	formMethods,
	textInputApi,
	setVenueName
}) => {
	return (
		<View margin='m' marginTop='l'>
			<Controller
				control={formMethods.control}
				render={({ field: { onBlur, value } }) => (
					<TextInput
						textInputApi={textInputApi}
						placeholder='Venue Name'
						onChangeText={setVenueName}
						onBlur={onBlur}
						value={value}
					/>
				)}
				name='name'
			/>
		</View>
	);
};

export default VenueName;
