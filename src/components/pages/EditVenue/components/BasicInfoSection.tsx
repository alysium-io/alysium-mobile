import { Section } from '@atomic';
import { Formatting } from '@etc';
import { useTextInput } from '@hooks';
import {
	EditableNumericInputWithLabel,
	EditableTextInputWithLabel,
	SectionHeader
} from '@molecules';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useEditVenuePageContext } from '../EditVenue.context';

const BasicInfoSection = () => {
	const { formMethods } = useEditVenuePageContext();

	const textInput1 = useTextInput();
	const textInput2 = useTextInput();
	const textInput3 = useTextInput();

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
						textInputApi={textInput1}
					/>
				)}
			/>
			<Controller
				name='phone_number'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableNumericInputWithLabel
						label='phone #'
						textInputApi={textInput2}
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
						textInputApi={textInput3}
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
