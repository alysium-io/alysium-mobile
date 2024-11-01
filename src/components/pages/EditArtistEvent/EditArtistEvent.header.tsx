import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface EditArtistEventPageHeaderProps {
	title: string;
}

const EditArtistEventPageHeader: React.FC<EditArtistEventPageHeaderProps> = ({
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

export default EditArtistEventPageHeader;
