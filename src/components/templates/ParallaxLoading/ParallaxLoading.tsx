import { SkeletonPlaceholder, View } from '@atomic';
import { BasePage } from '@organisms';
import React from 'react';

const ParallaxLoading = () => {
	return (
		<BasePage>
			<SkeletonPlaceholder>
				<View>
					{/* Main Image */}
					<View style={{ height: 400, width: '100%' }} />

					<View style={{ padding: 16 }}>
						{/* Event Details */}
						<View style={{ marginBottom: 24 }}>
							<View style={{ height: 24, width: '40%', marginBottom: 8 }} />
							<View style={{ height: 18, width: '30%', marginBottom: 16 }} />
							<View
								style={{
									flexDirection: 'row',
									justifyContent: 'space-between',
									marginBottom: 8
								}}
							>
								<View style={{ height: 16, width: '30%' }} />
								<View style={{ height: 16, width: '30%' }} />
							</View>
							<View style={{ height: 16, width: '20%' }} />
						</View>

						{/* Description */}
						<View style={{ height: 16, width: '60%', marginBottom: 24 }} />

						{/* Organizer Section */}
						<View>
							<View style={{ height: 20, width: 80, marginBottom: 16 }} />
							<View style={{ flexDirection: 'row', alignItems: 'center' }}>
								<View style={{ height: 50, width: 50, borderRadius: 25 }} />
								<View style={{ marginLeft: 12 }}>
									<View style={{ height: 18, width: 120 }} />
								</View>
								<View
									style={{
										position: 'absolute',
										right: 0,
										width: 24,
										height: 24
									}}
								/>
							</View>
						</View>

						{/* Map Placeholder */}
						<View style={{ height: 200, borderRadius: 16, marginTop: 24 }} />
					</View>
				</View>
			</SkeletonPlaceholder>
		</BasePage>
	);
};

export default ParallaxLoading;
