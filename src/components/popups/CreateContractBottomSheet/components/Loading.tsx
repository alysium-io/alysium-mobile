import { ActivityIndicator, Section, View } from '@atomic';
import { BottomSheetHeader } from '@organisms';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const Loading = () => {
	const { height: screenHeight } = useWindowDimensions();

	return (
		<View>
			<BottomSheetHeader text='Additional Notes' />
			<ScrollView
				alwaysBounceVertical={false}
				style={{
					height: screenHeight / 2
				}}
				contentContainerStyle={{
					flexGrow: 1
				}}
			>
				<Section margin='m' justifyContent='center' flex={1}>
					<ActivityIndicator color='#000' />
				</Section>
			</ScrollView>
		</View>
	);
};

export default Loading;
