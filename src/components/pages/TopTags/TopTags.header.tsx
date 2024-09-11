import { Text } from '@atomic';
import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

const TopTagsHeader: React.FC = () => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={<Text>Top Tags</Text>}
			/>
		</Header>
	);
};

export default TopTagsHeader;
