import { View } from '@atomic';
import React from 'react';
import { StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const ContentListItemSkeletonPlaceholder = () => (
	<View style={styles.container}>
		<SkeletonPlaceholder>
			<SkeletonPlaceholder.Item
				flexDirection='row'
				alignItems='center'
				padding={24}
			>
				<SkeletonPlaceholder.Item width={65} height={65} borderRadius={999} />
				<SkeletonPlaceholder.Item marginLeft={16} flex={1}>
					<SkeletonPlaceholder.Item width='60%' height={20} borderRadius={4} />
					<SkeletonPlaceholder.Item
						marginTop={6}
						width='80%'
						height={16}
						borderRadius={4}
					/>
				</SkeletonPlaceholder.Item>
			</SkeletonPlaceholder.Item>
		</SkeletonPlaceholder>
		<View style={styles.border} />
	</View>
);

const styles = StyleSheet.create({
	container: {},
	border: {
		height: StyleSheet.hairlineWidth,
		backgroundColor: '#E5E5E5',
		marginLeft: 16
	}
});

export default ContentListItemSkeletonPlaceholder;
