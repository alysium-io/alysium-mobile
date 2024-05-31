import { Text, View } from '@atomic';
import { FindOneVenueResponseDto } from '@flux/api/venue/dto/venue-find-one.dto';
import { UpdateVenueBodyDto } from '@flux/api/venue/dto/venue-update.dto';
import { EditableProfileImage, LargeTextInput } from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';
import { Asset } from 'react-native-image-picker';

interface HeaderSectionProps {
	formMethods: UseFormReturn<UpdateVenueBodyDto>;
	venueData: FindOneVenueResponseDto;
	setVenueProfileImage: (image: Asset) => void;
}

const HeaderSection: React.FC<HeaderSectionProps> = ({
	formMethods,
	venueData,
	setVenueProfileImage
}) => {
	return (
		<View marginTop='l' marginHorizontal='m' alignItems='center'>
			<EditableProfileImage
				image={venueData.profile_image?.url || ''}
				onChooseImage={setVenueProfileImage}
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
