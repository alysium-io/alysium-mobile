import { Text, View } from '@atomic';
import { TimelineListItem } from '@molecules';
import React from 'react';
import { ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LineupTest = () => {
	const insets = useSafeAreaInsets();
	return (
		<View style={{ marginTop: insets.top }} flex={1}>
			<ScrollView>
				<Text
					variant='section-header-2'
					textDecorationLine='underline'
					textAlign='center'
				>
					History
				</Text>
				{[1, 2, 3, 4].map((_, index) => (
					<TimelineListItem
						key={index}
						onPress={() => {}}
						titleTextProps={{
							title: 'Title',
							bottomSubtext: 'Subtext'
						}}
						timeLineProps={{
							topTailProps: { vertical: index === 0 ? 'none' : 'top' }
						}}
						profileImageProps={{
							size: 'medium',
							image: 'https://i.pravatar.cc/300'
						}}
						fixedTextProps={{
							text: 'Dec. 23rd'
						}}
					/>
				))}
				<TimelineListItem
					titleTextProps={{ title: '' }}
					timeLineProps={{
						bottomTailProps: { vertical: 'none' },
						markerProps: { type: 'circle' }
					}}
					fixedTextProps={{ text: 'end' }}
				/>
			</ScrollView>
		</View>
	);
};

export default LineupTest;
