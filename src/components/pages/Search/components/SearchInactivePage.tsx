import { Section, View } from '@atomic';
import { useNavigation } from '@hooks';
import { SectionHeader } from '@molecules';
import { BlockListItem, CategoricalListItemForContentType } from '@organisms';
import { ContentType } from '@types';
import React from 'react';
import { FadeInDown, FadeOutUp } from 'react-native-reanimated';

const SearchInactivePage = () => {
	const { locationPage, tagPage } = useNavigation();

	return (
		<View
			animated
			entering={FadeInDown.duration(250)}
			exiting={FadeOutUp.duration(250)}
		>
			<Section marginBottom='l'>
				<CategoricalListItemForContentType
					contentType={ContentType.artist}
					title='Artists'
					subtitle='42 following'
					onPress={() => console.log('pressed')}
				/>
				<CategoricalListItemForContentType
					contentType={ContentType.host}
					title='Hosts'
					subtitle='12 following'
					onPress={() => console.log('pressed')}
				/>
				<CategoricalListItemForContentType
					contentType={ContentType.tag}
					title='Tags'
					subtitle='2 following'
					onPress={() => console.log('pressed')}
				/>
				<CategoricalListItemForContentType
					contentType={ContentType.location}
					title='Locations'
					subtitle='1 following'
					onPress={() => locationPage(2)}
				/>
			</Section>
			<Section margin='m'>
				<SectionHeader text='Discover' icon='discover' />
				<View marginBottom='m'>
					<BlockListItem
						icon='tag'
						title='Electro House'
						subtitle='1.2k followers'
						color='ion'
						onPress={() => tagPage(3668)}
					/>
				</View>
				<View marginBottom='m'>
					<BlockListItem
						icon='location'
						title='Los Angeles'
						subtitle='5.1M followers'
						color='ion'
						onPress={() => tagPage(1)}
					/>
				</View>
				<View marginBottom='m'>
					<BlockListItem
						icon='tag'
						title='house'
						subtitle='2.6M followers'
						color='ion'
						onPress={() => tagPage(1)}
					/>
				</View>
			</Section>
		</View>
	);
};

export default SearchInactivePage;
