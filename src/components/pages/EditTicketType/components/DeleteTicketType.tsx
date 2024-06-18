import { View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';

interface DeleteTicketTypeProps {
	confirmDelete: () => void;
}

const DeleteTicketType: React.FC<DeleteTicketTypeProps> = ({
	confirmDelete
}) => {
	return (
		<View margin='m'>
			<Button
				text='Delete'
				variant='outlined'
				colorVariant='negative'
				onPress={confirmDelete}
			/>
		</View>
	);
};

export default DeleteTicketType;
