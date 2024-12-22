import { useNavigation } from '@hooks';
import { Header, HeaderIconButton, HeaderSection } from '@organisms';
import React from 'react';

interface DraftEventPageHeaderProps {}

const DraftEventPageHeader: React.FC<DraftEventPageHeaderProps> = () => {
	const { back } = useNavigation();
	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
			/>
		</Header>
	);
};

export default DraftEventPageHeader;
