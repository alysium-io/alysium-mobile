import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { Props } from '@types';
import React from 'react';

interface DraftEventPageHeaderProps {
	titleProps: Props<typeof HeaderTitle>;
	onPressMenu: () => void;
}

const DraftEventPageHeader: React.FC<DraftEventPageHeaderProps> = ({
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

export default DraftEventPageHeader;
