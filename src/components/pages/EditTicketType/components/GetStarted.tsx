import { Text, View } from '@atomic';
import { Button } from '@molecules';
import React from 'react';
import { StyleSheet } from 'react-native';

interface GetStartedProps {
	createTicketCollection: () => void;
}

const GetStarted: React.FC<GetStartedProps> = ({ createTicketCollection }) => {
	return (
		<View style={styles.container}>
			<Text variant='section-header-1'>Get Started</Text>
			<Button text='Create Tickets' onPress={createTicketCollection} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default GetStarted;
