import React from 'react';
import { View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export const Loading = () => {
	return (
		<SkeletonPlaceholder>
			<View style={{ padding: 16 }}>
				{/* Back button area */}
				<View style={{ width: 24, height: 24, marginBottom: 20 }} />

				{/* Header Image/Avatar */}
				<View
					style={{
						alignSelf: 'center',
						width: 120,
						height: 120,
						borderRadius: 60,
						marginVertical: 20
					}}
				/>

				{/* Edit icon */}
				<View
					style={{
						position: 'absolute',
						top: 160,
						right: 30,
						width: 24,
						height: 24,
						borderRadius: 12
					}}
				/>

				{/* Title */}
				<View
					style={{
						height: 35,
						borderRadius: 4,
						marginBottom: 30,
						width: '80%',
						alignSelf: 'center'
					}}
				/>

				{/* Date/Time Row */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 20,
						paddingHorizontal: 10
					}}
				>
					<View
						style={{
							width: 24,
							height: 24,
							borderRadius: 12,
							marginRight: 12
						}}
					/>
					<View>
						<View style={{ width: 180, height: 20, borderRadius: 4 }} />
						<View
							style={{ width: 100, height: 16, borderRadius: 4, marginTop: 8 }}
						/>
					</View>
					<View
						style={{
							width: 24,
							height: 24,
							borderRadius: 12,
							position: 'absolute',
							right: 10
						}}
					/>
				</View>

				{/* Location Row */}
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 30,
						paddingHorizontal: 10
					}}
				>
					<View
						style={{
							width: 24,
							height: 24,
							borderRadius: 12,
							marginRight: 12
						}}
					/>
					<View>
						<View style={{ width: 220, height: 20, borderRadius: 4 }} />
						<View
							style={{ width: 160, height: 16, borderRadius: 4, marginTop: 8 }}
						/>
					</View>
					<View
						style={{
							width: 24,
							height: 24,
							borderRadius: 12,
							position: 'absolute',
							right: 10
						}}
					/>
				</View>

				{/* Additional Info Section */}
				<View
					style={{
						flexDirection: 'row',
						marginBottom: 30,
						paddingHorizontal: 10
					}}
				>
					<View style={{ flex: 1 }}>
						<View
							style={{
								width: 100,
								height: 16,
								borderRadius: 4,
								marginBottom: 8
							}}
						/>
						<View style={{ width: 140, height: 20, borderRadius: 4 }} />
					</View>
					<View style={{ flex: 1 }}>
						<View
							style={{
								width: 100,
								height: 16,
								borderRadius: 4,
								marginBottom: 8
							}}
						/>
						<View style={{ width: 140, height: 20, borderRadius: 4 }} />
					</View>
				</View>

				{/* Assets Section */}
				<View style={{ paddingHorizontal: 10 }}>
					<View
						style={{ height: 24, width: 80, borderRadius: 4, marginBottom: 16 }}
					/>
					<View style={{ height: 80, borderRadius: 4, marginBottom: 20 }} />
				</View>

				{/* Image Grid */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						marginBottom: 20
					}}
				>
					<View style={{ width: '32%', height: 120, borderRadius: 8 }} />
					<View style={{ width: '32%', height: 120, borderRadius: 8 }} />
					<View style={{ width: '32%', height: 120, borderRadius: 8 }} />
				</View>

				{/* Additional Content */}
				<View style={{ paddingHorizontal: 10 }}>
					<View
						style={{
							height: 20,
							width: '100%',
							borderRadius: 4,
							marginBottom: 12
						}}
					/>
					<View
						style={{
							height: 20,
							width: '90%',
							borderRadius: 4,
							marginBottom: 12
						}}
					/>
					<View
						style={{
							height: 20,
							width: '95%',
							borderRadius: 4,
							marginBottom: 20
						}}
					/>
				</View>

				{/* Action Buttons */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-between',
						paddingHorizontal: 10,
						marginBottom: 30
					}}
				>
					<View style={{ width: '48%', height: 40, borderRadius: 20 }} />
					<View style={{ width: '48%', height: 40, borderRadius: 20 }} />
				</View>

				{/* Bottom Navigation */}
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						paddingVertical: 10
					}}
				>
					<View style={{ width: 24, height: 24, borderRadius: 12 }} />
					<View style={{ width: 24, height: 24, borderRadius: 12 }} />
					<View style={{ width: 24, height: 24, borderRadius: 12 }} />
				</View>
			</View>
		</SkeletonPlaceholder>
	);
};
