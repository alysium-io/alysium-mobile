import { Section, Text, View } from '@atomic';
import { BlockListItem, ContentListItem } from '@molecules';
import React from 'react';
import { FadeInDown, FadeOutUp } from 'react-native-reanimated';

const SearchInactivePage = () => {
	return (
		<View
			animated
			entering={FadeInDown.duration(250)}
			exiting={FadeOutUp.duration(250)}
		>
			<Section marginBottom='l'>
				<ContentListItem
					onPress={() => console.log('Pressed')}
					titleTextProps={{
						title: 'Artists',
						bottomSubtext: '42 following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'artist',
							backgroundColor: 'palette.p.medium',
							iconColor: 'palette.p.light'
						}
					}}
				/>
				<ContentListItem
					onPress={() => console.log('Pressed')}
					titleTextProps={{
						title: 'Tags',
						bottomSubtext: '3 following'
					}}
					profileImageProps={{
						borderRadius: 'm',
						defaultImageProps: {
							icon: 'host',
							backgroundColor: 'palette.t.medium',
							iconColor: 'palette.t.light'
						}
					}}
				/>
			</Section>
			<Section margin='m'>
				<Text variant='section-header-1' marginBottom='m'>
					Discover
				</Text>
				<BlockListItem
					icon='tag'
					onPress={() => console.log(3668)}
					titleTextProps={{
						title: 'house',
						topSubtext: '2.6M followers'
					}}
				/>
				<BlockListItem
					icon='location'
					onPress={() => console.log(1)}
					titleTextProps={{
						title: 'Los Angeles',
						topSubtext: '5.1M followers'
					}}
				/>
				<BlockListItem
					icon='tag'
					onPress={() => console.log(1)}
					titleTextProps={{
						title: 'rock',
						topSubtext: '4.3M followers'
					}}
				/>
			</Section>
		</View>
	);
};

export default SearchInactivePage;
