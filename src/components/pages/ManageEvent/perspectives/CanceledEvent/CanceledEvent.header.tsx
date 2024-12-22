import { LiveIndicator, Text, View } from '@atomic';
import { EventLink } from '@flux/api/event-link/event-link.entity';
import { ComplexEventStatus } from '@flux/api/event/types';
import { useComplexEventStatus, useNavigation } from '@hooks';
import {
	Header,
	HeaderIconButton,
	HeaderSection,
	HeaderTitle
} from '@organisms';
import React from 'react';

interface CanceledEventPageHeaderProps {
	eventData?: EventLink;
}

const CanceledEventPageHeader: React.FC<CanceledEventPageHeaderProps> = ({
	eventData
}) => {
	const { back } = useNavigation();
	const { complexStatus, semanticStatus } = useComplexEventStatus(
		eventData?.event
	);

	return (
		<Header>
			<HeaderSection
				LeftComponent={<HeaderIconButton onPress={back} name='arrow-left' />}
				CenterComponent={
					<HeaderTitle
						title={
							<View flexDirection='row' alignItems='center'>
								<LiveIndicator status={complexStatus} />
								<Text
									marginLeft='s'
									variant='paragraph-small-medium'
									color={
										complexStatus === ComplexEventStatus.live
											? 'danger'
											: 'text.q'
									}
								>
									{semanticStatus}
								</Text>
							</View>
						}
					/>
				}
			/>
		</Header>
	);
};

export default CanceledEventPageHeader;
