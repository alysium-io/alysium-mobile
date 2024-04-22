import { Portal } from '@gorhom/portal';
import { StackHeaderProps, useCardAnimation } from '@react-navigation/stack';
import React from 'react';
import HeaderCenterSection from './HeaderCenterSection';
import HeaderLeftSection from './HeaderLeftSection';
import HeaderRightSection from './HeaderRightSection';
import HeaderWrapper from './HeaderWrapper';

interface HeaderProps {
	LeftComponent?: React.FC;
	CenterComponent?: React.FC;
	RightComponent?: React.FC;
	stackHeaderProps: StackHeaderProps;
}

const Header: React.FC<HeaderProps> = ({
	LeftComponent,
	CenterComponent,
	RightComponent,
	stackHeaderProps
}) => {
	const cardAnimationProps = useCardAnimation();

	return (
		<Portal>
			<HeaderWrapper cardAnimationProps={cardAnimationProps}>
				<HeaderLeftSection cardAnimationProps={cardAnimationProps}>
					{LeftComponent && <LeftComponent />}
				</HeaderLeftSection>
				<HeaderCenterSection>
					{CenterComponent && <CenterComponent />}
				</HeaderCenterSection>
				<HeaderRightSection>
					{RightComponent && <RightComponent />}
				</HeaderRightSection>
			</HeaderWrapper>
		</Portal>
	);
};

export default Header;
