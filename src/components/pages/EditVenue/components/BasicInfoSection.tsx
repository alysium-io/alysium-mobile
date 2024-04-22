import { Section } from '@atomic';
import { useTextInput } from '@hooks';
import { SectionHeader } from '@molecules';
import React from 'react';
import { useEditVenuePageContext } from '../EditVenue.context';

const BasicInfoSection = () => {
	const { formMethods } = useEditVenuePageContext();

	const textInput1 = useTextInput();
	const textInput2 = useTextInput();
	const textInput3 = useTextInput();

	return (
		<Section marginTop='xl' marginHorizontal='m'>
			<SectionHeader text='Basic Info' />
			{/* <Controller
				name='address'
				control={formMethods.control}
				render={({ field: { onChange, onBlur, value } }) => (
					<EditableTextInputWithLabel
						label='address'
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
						value={value}
						maxLength={9}
						onChangeText={(text: string) =>
							onChange(Formatting.formatCommaSeparatedNumber(text))
						}
					/>
				)}
			/> */}
		</Section>
	);
};

export default BasicInfoSection;
