import React from 'react';
import HeaderCenterSection from './HeaderCenterSection';
import HeaderLeftSection from './HeaderLeftSection';
import HeaderRightSection from './HeaderRightSection';
import HeaderWrapper from './HeaderWrapper';

interface HeaderProps {
	LeftComponent?: React.ReactNode;
	CenterComponent?: React.ReactNode;
	RightComponent?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({
	LeftComponent,
	CenterComponent,
	RightComponent
}) => {
	return (
		<HeaderWrapper>
			<HeaderLeftSection>{LeftComponent}</HeaderLeftSection>
			<HeaderCenterSection>{CenterComponent}</HeaderCenterSection>
			<HeaderRightSection>{RightComponent}</HeaderRightSection>
		</HeaderWrapper>
	);
};

export default Header;
