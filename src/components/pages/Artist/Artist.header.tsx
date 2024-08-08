import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderTitle } from '@organisms';
import React from 'react';

interface ArtistPageHeaderProps {
	title: string;
}

const ArtistPageHeader: React.FC<ArtistPageHeaderProps> = ({ title }) => {
	const { back } = useNavigation();
	return (
		<Header
			LeftComponent={<HeaderIconButton onPress={back} icon='arrow-left' />}
			CenterComponent={
				<HeaderTitle
					title={title}
					titleProps={{ variant: 'paragraph-small' }}
				/>
			}
			RightComponent={undefined}
		/>
	);
};

export default ArtistPageHeader;
