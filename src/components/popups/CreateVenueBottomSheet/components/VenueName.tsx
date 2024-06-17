import { View } from '@atomic';
import { CreateVenueBodyDto } from '@flux/api/venue/dto/venue-create.dto';
import { TextInputApi } from '@hooks';
import { EditableTextInputWithLabel } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface VenueNameProps {
	formMethods: UseFormReturn<CreateVenueBodyDto>;
	venueNameTextInputApi: TextInputApi;
}

const VenueName: React.FC<VenueNameProps> = ({
	formMethods,
	venueNameTextInputApi
}) => {
	return (
		<View margin='m' marginTop='l'>
			<Controller
				name='name'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableTextInputWithLabel
						textInputApi={venueNameTextInputApi}
						placeholder='EDX Nightclub, My Backyard, etc.'
						label='Venue Name'
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
					/>
				)}
			/>
		</View>
	);
};

export default VenueName;
