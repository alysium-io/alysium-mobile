import { Text, View } from '@atomic';
import {
	BasePage,
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import ParallaxScroll from '@src/components/organisms/Parallax/ParallaxScroll';
import React from 'react';

const Parallax = () => {
	return (
		<BasePage>
			<Header>
				<HeaderSection
					LeftComponent={<HeaderIconButton name='arrow-left' />}
					CenterComponent={
						<HeaderTitle
							title='DJSchmalec'
							titleProps={{ variant: 'paragraph-small' }}
						/>
					}
				/>
			</Header>
			<ParallaxScroll
				title='DJSchmalec'
				image='https://images.unsplash.com/photo-1603302576837-37561b2e2302'
			>
				{Array.from({ length: 1000 }).map((_, index) => (
					<View key={index}>
						<Text>{index}</Text>
					</View>
				))}
			</ParallaxScroll>
		</BasePage>
	);
};

export default Parallax;
