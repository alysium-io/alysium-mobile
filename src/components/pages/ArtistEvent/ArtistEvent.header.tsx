import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface ArtistEventPageHeaderProps {
	title: string;
}

const ArtistEventPageHeader: React.FC<ArtistEventPageHeaderProps> = ({
	title
}) => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={title}
						titleProps={{ variant: 'paragraph-small' }}
					/>
				}
			/>
		</Header>
	);
};

export default ArtistEventPageHeader;
