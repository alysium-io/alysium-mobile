import { Text, View } from '@atomic';
import { ColorPalette } from '@types';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
	hazePalette,
	honeyPalette,
	ionPalette,
	mattPalette,
	meteorPalette,
	mintPalette,
	neutralPalette,
	sieonPalette
} from 'src/restyle/colors/palettes';

interface PaletteDisplayProps {
	palette: ColorPalette;
	name: string;
}

const PaletteDisplay: React.FC<PaletteDisplayProps> = ({ palette, name }) => {
	return (
		<View marginVertical='m'>
			<Text variant='section-header-1'>{name}</Text>
			<View
				flexDirection='row'
				flexWrap='wrap'
				justifyContent='space-between'
				marginTop='m'
			>
				{Object.keys(palette).map((key) => (
					<View key={key}>
						<Text style={{ color: palette[key as keyof ColorPalette] }}>
							{key}
						</Text>
						<View
							style={{
								height: 100,
								width: 100,
								backgroundColor: palette[key as keyof ColorPalette],
								borderRadius: 100
							}}
						/>
					</View>
				))}
			</View>
		</View>
	);
};

const ColorPalettePage = () => {
	const insets = useSafeAreaInsets();
	return (
		<View
			style={{
				marginBottom: insets.bottom
			}}
			marginTop='m'
			marginHorizontal='m'
		>
			<View>
				<Text variant='section-header-2'>Brand</Text>
				<PaletteDisplay palette={mattPalette} name='Matt' />
				<PaletteDisplay palette={ionPalette} name='Ion' />
				<PaletteDisplay palette={neutralPalette} name='Neutral' />
			</View>
			<View marginTop='xl'>
				<Text variant='section-header-2'>Accents</Text>
				<PaletteDisplay palette={hazePalette} name='Haze' />
				<PaletteDisplay palette={meteorPalette} name='Meteor' />
				<PaletteDisplay palette={sieonPalette} name='Sieon' />
				<PaletteDisplay palette={honeyPalette} name='Honey' />
				<PaletteDisplay palette={mintPalette} name='Mint' />
			</View>
		</View>
	);
};

export default ColorPalettePage;
