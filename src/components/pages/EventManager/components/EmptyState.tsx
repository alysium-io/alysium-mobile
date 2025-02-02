import { RefreshControl, ScrollView, Text, View } from '@atomic';
import { useRefresh } from '@hooks';
import React from 'react';

interface EmptyStateProps {
	title: string | React.ReactNode;
	refetch: () => void;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title, refetch }) => {
	const refreshControl = useRefresh(refetch);
	return (
		<ScrollView
			refreshControl={<RefreshControl {...refreshControl} />}
			contentContainerStyle={{ flex: 1 }}
		>
			<View flex={1} justifyContent='center' alignItems='center'>
				<Text variant='paragraph-medium' color='text.q' textAlign='center'>
					{title}
				</Text>
			</View>
		</ScrollView>
	);
};

export default EmptyState;
