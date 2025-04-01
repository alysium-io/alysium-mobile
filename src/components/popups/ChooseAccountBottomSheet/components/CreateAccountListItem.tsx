import { Avatar, Text, View } from '@atomic';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface CreateAccountListItemProps {
	openCreateArtistSheet: () => void;
}

const CreateAccountListItem: React.FC<CreateAccountListItemProps> = ({
	openCreateArtistSheet
}) => {
	return (
		<TouchableOpacity onPress={openCreateArtistSheet}>
			<View
				marginHorizontal='m'
				padding='m'
				flexDirection='row'
				alignItems='center'
				gap='m'
				borderRadius='xl'
			>
				<View borderRadius='round' overflow='hidden' height={50} width={50}>
					<Avatar
						defaultImageProps={{
							icon: 'plus',
							iconProps: {
								size: 's'
							}
						}}
					/>
				</View>
				<View gap='xs' flex={1}>
					<Text
						variant='paragraph-small-medium'
						color='text.p'
						numberOfLines={1}
					>
						Create Artist Account
					</Text>
					<Text
						variant='paragraph-small'
						color='text.s'
						style={{ fontSize: 12 }}
					>
						Artist accounts can be used to play shows and manage your band
					</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
};

export default CreateAccountListItem;
