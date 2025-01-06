import { SkeletonPlaceholder, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SkeletonEventCard = () => {
	const { height } = useWindowDimensions();
	return (
		<SkeletonPlaceholder>
			<View style={{ marginBottom: 16 }}>
				{/* Profile row */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						margin: 16,
						marginBottom: 12
					}}
				>
					<View style={{ width: 40, height: 40, borderRadius: 20 }} />
					<View style={{ marginLeft: 12 }}>
						<View style={{ width: 120, height: 20, borderRadius: 4 }} />
						<View
							style={{ width: 80, height: 16, borderRadius: 4, marginTop: 4 }}
						/>
					</View>
				</View>

				{/* Image */}
				<View style={{ width: '100%', height: height * 0.5 }} />

				{/* Event details */}
				<View style={{ margin: 16, marginTop: 12, marginBottom: 8 }}>
					<View style={{ width: 100, height: 20, borderRadius: 4 }} />
					<View
						style={{ width: '80%', height: 16, borderRadius: 4, marginTop: 4 }}
					/>
					<View
						style={{ width: '60%', height: 16, borderRadius: 4, marginTop: 4 }}
					/>
				</View>
			</View>
		</SkeletonPlaceholder>
	);
};

const LoadingFeed = () => {
	const insets = useSafeAreaInsets();
	return (
		<BasePage>
			<View style={{ marginTop: insets.top }}>
				<SkeletonEventCard />
				<SkeletonEventCard />
				<SkeletonEventCard />
			</View>
		</BasePage>
	);
};

export default LoadingFeed;
