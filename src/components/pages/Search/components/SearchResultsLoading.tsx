import { SkeletonPlaceholder, View } from '@atomic';
import React from 'react';

const SkeletonSearchResult = () => (
	<SkeletonPlaceholder>
		<View
			style={{
				flexDirection: 'row',
				alignItems: 'center',
				padding: 16,
				paddingBottom: 8
			}}
		>
			{/* Profile Image */}
			<View style={{ width: 75, height: 75, borderRadius: 9999 }} />

			{/* Name and Followers */}
			<View style={{ marginLeft: 16, flex: 1 }}>
				<View style={{ width: '60%', height: 14, borderRadius: 4 }} />
				<View
					style={{ width: '40%', height: 12, borderRadius: 4, marginTop: 8 }}
				/>
			</View>
		</View>
	</SkeletonPlaceholder>
);

const LoadingSearchResults = () => (
	<View>
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
		<SkeletonSearchResult />
	</View>
);

export default LoadingSearchResults;
