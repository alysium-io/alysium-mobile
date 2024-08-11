import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface TagPageHeaderProps {
	title: string;
}

const TagPageHeader: React.FC<TagPageHeaderProps> = ({ title }) => {
	const { back } = useNavigation();

	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={<HeaderTitle title={title} />}
			/>
		</Header>
	);
};

export default TagPageHeader;
