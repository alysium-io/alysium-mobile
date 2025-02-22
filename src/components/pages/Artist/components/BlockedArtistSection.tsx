import { Text, View } from '@atomic';
import React from 'react';

const BlockedArtistSection = () => {
	return (
		<View margin='m' rowGap='s'>
			<Text variant='page-header' textAlign='center' color='text.s'>
				Artist is Blocked
			</Text>
			<Text variant='paragraph-small' color='text.q' textAlign='center'>
				We will limit the visibility of this artist to you.
			</Text>
		</View>
	);
};

export default BlockedArtistSection;
