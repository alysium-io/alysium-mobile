import { Text, View } from '@atomic';
import { GoogleMapsAutocompleteResult } from '@flux/api/location/types';
import { useTheme } from '@hooks';
import React from 'react';

interface HeaderProps {
	googleMapsAutocompleteResult: GoogleMapsAutocompleteResult | null;
}

const Header: React.FC<HeaderProps> = ({ googleMapsAutocompleteResult }) => {
	const { theme } = useTheme();
	return (
		<View
			padding='m'
			borderBottomColor='border.light'
			borderBottomWidth={theme.borderWidth.normal}
		>
			<Text variant='page-header' marginBottom='s'>
				{googleMapsAutocompleteResult?.main_text}
			</Text>
			<Text variant='paragraph' color='text.q'>
				{googleMapsAutocompleteResult?.secondary_text}
			</Text>
		</View>
	);
};

export default Header;
