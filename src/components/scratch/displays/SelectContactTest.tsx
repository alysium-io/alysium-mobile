import { View } from '@atomic';
import { useSheet } from '@hooks';
import { Button } from '@molecules';
import { ContactPickerBottomSheet } from '@popups';
import React from 'react';

const SelectContactTest = () => {
	const sheetApi = useSheet();

	return (
		<View flex={1} justifyContent='center' margin='m'>
			<Button text='Select Contact' onPress={sheetApi.open} />
			<ContactPickerBottomSheet
				sheetApi={sheetApi}
				onSelect={(contact) => console.log(contact)}
			/>
		</View>
	);
};

export default SelectContactTest;
