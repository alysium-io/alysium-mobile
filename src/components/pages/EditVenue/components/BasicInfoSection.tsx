import { Section } from '@atomic';
import { Formatting } from '@etc';
import { UpdateVenueBodyDto } from '@flux/api/venue/dto/venue-update.dto';
import { TextInputApi } from '@hooks';
import {
	EditableNumericInputWithLabel,
	EditableTextInputWithLabel,
	SectionHeader
} from '@molecules';
import React from 'react';
import { Controller, UseFormReturn } from 'react-hook-form';

interface BasicInfoSectionProps {
	formMethods: UseFormReturn<UpdateVenueBodyDto>;
	streetAddressTextInputApi: TextInputApi;
	phoneNumberTextInputApi: TextInputApi;
	capacityTextInputApi: TextInputApi;
}

const BasicInfoSection: React.FC<BasicInfoSectionProps> = ({
	formMethods,
	streetAddressTextInputApi,
	phoneNumberTextInputApi,
	capacityTextInputApi
}) => {
	return (
		<Section marginTop='xl' marginHorizontal='m'>
			<SectionHeader text='Basic Info' />
			<Controller
				name='street'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableTextInputWithLabel
						label='street'
						placeholder='10028 N. Virginia Ave.'
						onChangeText={onChange}
						onBlur={onBlur}
						value={value}
						textInputApi={streetAddressTextInputApi}
					/>
				)}
			/>
			<Controller
				name='phone_number'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableNumericInputWithLabel
						label='phone #'
						textInputApi={phoneNumberTextInputApi}
						placeholder='(123) 456-7891'
						keyboardType='phone-pad'
						onBlur={onBlur}
						onChangeText={(text: string) =>
							onChange(Formatting.formatPhoneNumber(text))
						}
						value={value}
						maxLength={14}
					/>
				)}
			/>
			<Controller
				name='capacity'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableNumericInputWithLabel
						label='capacity'
						textInputApi={capacityTextInputApi}
						placeholder='Max # of people'
						keyboardType='numeric'
						onBlur={onBlur}
						value={Formatting.formatCommaSeparatedNumber(value)}
						maxLength={9}
						onChangeText={(text: string) =>
							onChange(Formatting.formatCommaSeparatedNumber(text))
						}
					/>
				)}
			/>
		</Section>
	);
};

export default BasicInfoSection;
