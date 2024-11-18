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
			justifyContent='center'
			alignItems='center'
			borderBottomColor='border.light'
			borderBottomWidth={theme.borderWidth.normal}
			flex={1}
		>
			<Text variant='section-header-1' marginBottom='s'>
				{googleMapsAutocompleteResult?.main_text}
			</Text>
			<Text variant='paragraph' color='text.q'>
				{googleMapsAutocompleteResult?.secondary_text}
			</Text>
		</View>
	);
};

export default Header;
