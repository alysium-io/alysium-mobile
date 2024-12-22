import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { Props } from '@types';
import React from 'react';

interface EditEventPageHeaderProps {
	titleProps: Props<typeof HeaderTitle>;
	onPressMenu: () => void;
}

const EditEventPageHeader: React.FC<EditEventPageHeaderProps> = ({
	titleProps,
	onPressMenu
}) => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={<HeaderTitle {...titleProps} />}
				RightComponent={<HeaderIconButton onPress={onPressMenu} name='menu' />}
			/>
		</Header>
	);
};

export default EditEventPageHeader;
