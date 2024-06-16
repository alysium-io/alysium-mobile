import { Icon, Text, View } from '@atomic';
import { TicketType } from '@flux/api/ticket-type';
import { ListItemContainer } from '@organisms';
import React from 'react';

interface EditTicketListItemProps {
	ticketTypeData: TicketType;
	border?: boolean;
	onPress?: () => void;
}

const EditTicketListItem: React.FC<EditTicketListItemProps> = ({
	ticketTypeData,
	border = true,
	onPress = () => {}
}) => {
	return (
		<ListItemContainer border={border} onPress={onPress}>
			<View marginVertical='m' flex={1}>
				<Text marginVertical='xs' variant='paragraph-large' color='t1'>
					{ticketTypeData.name}
				</Text>
				<Text marginVertical='xs' variant='paragraph' color='t2'>
					{ticketTypeData.num_available === null
						? 'Unlimited'
						: 'Available: ' + ticketTypeData.num_available.toLocaleString()}
				</Text>
				<Text marginVertical='xs' variant='paragraph' color='t2'>
					{ticketTypeData.price === null
						? '$ Free'
						: '$' + ticketTypeData.price}
				</Text>
			</View>
			<View margin='m'>
				<Icon name='arrow-right' color='t2' size='small' />
			</View>
		</ListItemContainer>
	);
};

export default EditTicketListItem;
