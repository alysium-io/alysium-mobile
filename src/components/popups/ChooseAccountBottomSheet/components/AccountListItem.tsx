import { Avatar, Text, View } from '@atomic';
import { Persona } from '@types';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface AccountListItemProps {
	name: string;
	subtitle: string;
	image?: string | null;
	personaType: Persona;
	onPress: () => void;
	isActive: boolean;
}

const AccountListItem = ({
	name,
	image,
	subtitle,
	personaType,
	onPress,
	isActive
}: AccountListItemProps) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<View
				marginHorizontal='m'
				padding='m'
				flexDirection='row'
				alignItems='center'
				gap='m'
				backgroundColor={isActive ? 'primary' : undefined}
				borderRadius='xl'
			>
				<View borderRadius='round' overflow='hidden' height={50} width={50}>
					<Avatar
						image={image}
						defaultImageProps={{
							icon: personaType,
							iconProps: {
								size: 's'
							}
						}}
					/>
				</View>
				<View gap='xs'>
					<Text
						variant='paragraph-medium'
						color={isActive ? 'white' : 'text.p'}
						numberOfLines={1}
					>
						{name}
					</Text>
					<Text
						variant='paragraph-small'
						color={isActive ? 'palette.neutral.p2' : 'text.s'}
					>
						{subtitle}
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default AccountListItem;
