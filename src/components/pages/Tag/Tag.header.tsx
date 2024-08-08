import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderTitle } from '@organisms';
import React from 'react';

interface TagPageHeaderProps {
	title: string;
}

const TagPageHeader: React.FC<TagPageHeaderProps> = ({ title }) => {
	const { back } = useNavigation();
	return (
		<Header
			LeftComponent={<HeaderIconButton onPress={back} icon='arrow-left' />}
			CenterComponent={<HeaderTitle title={title} />}
			RightComponent={undefined}
		/>
	);
};

export default TagPageHeader;
