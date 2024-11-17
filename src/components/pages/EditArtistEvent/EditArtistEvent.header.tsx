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
	onPressMenu: () => void;
}

const EditArtistEventPageHeader: React.FC<EditArtistEventPageHeaderProps> = ({
	title,
	onPressMenu
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
				RightComponent={
					<HeaderIconButton onPress={onPressMenu} name='meatballs' />
				}
			/>
		</Header>
	);
};

export default EditArtistEventPageHeader;
