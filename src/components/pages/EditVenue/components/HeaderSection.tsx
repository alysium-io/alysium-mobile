import { Text, View } from '@atomic';
import { EditableProfileImage, LargeTextInput } from '@molecules';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useEditVenuePageContext } from '../EditVenue.context';

const HeaderSection = () => {
	const { formMethods, venueData, changeVenueImage } =
		useEditVenuePageContext();

	return (
		<View marginTop='l' marginHorizontal='m' alignItems='center'>
			<EditableProfileImage
				image={venueData.profile_image?.url || ''}
				onChooseImage={changeVenueImage}
			/>
			<Text
				marginTop='l'
				textAlign='center'
				variant='paragraph-large'
				color='t2'
			>
				venue
			</Text>
			<View marginTop='l'>
				<Controller
					name='name'
					control={formMethods.control}
					rules={{ required: true }}
					render={({ field: { onChange, onBlur, value } }) => (
						<LargeTextInput
							placeholder='Venue Name'
							onChangeText={onChange}
							textAlign='center'
							onBlur={onBlur}
							value={value}
						/>
					)}
				/>
			</View>
		</View>
	);
};

export default HeaderSection;
