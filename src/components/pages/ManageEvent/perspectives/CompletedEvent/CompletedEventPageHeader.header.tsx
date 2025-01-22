import { EventLink } from '@flux/api/event-link/event-link.entity';
import { useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import { ComplexEventStatusIndicator } from '@templates';
import React from 'react';

interface CompletedEventPageHeaderProps {
	eventData?: EventLink;
	onPressMenu: () => void;
}

const CompletedEventPageHeader: React.FC<CompletedEventPageHeaderProps> = ({
	eventData,
	onPressMenu
}) => {
	const { back } = useNavigation();

	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={<ComplexEventStatusIndicator event={eventData?.event} />}
					/>
				}
				RightComponent={<HeaderIconButton onPress={onPressMenu} name='menu' />}
			/>
		</Header>
	);
};

export default CompletedEventPageHeader;
