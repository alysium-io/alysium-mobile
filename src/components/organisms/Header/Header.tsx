import React from 'react'
import HeaderWrapper from './HeaderWrapper'
import HeaderLeftSection from './HeaderLeftSection'
import HeaderCenterSection from './HeaderCenterSection'
import HeaderRightSection from './HeaderRightSection'
import { Portal } from '@gorhom/portal'
import { StackHeaderProps, useCardAnimation } from '@react-navigation/stack'


interface HeaderProps {
    LeftComponent?: React.FC
    CenterComponent?: React.FC
    RightComponent?: React.FC
    stackHeaderProps: StackHeaderProps
}

const Header : React.FC<HeaderProps> = ({
    LeftComponent,
    CenterComponent,
    RightComponent,
    stackHeaderProps
}) => {

    const cardAnimationProps = useCardAnimation()

    return (
        <Portal>
            <HeaderWrapper cardAnimationProps={cardAnimationProps}>
                <HeaderLeftSection cardAnimationProps={cardAnimationProps}>
                    { LeftComponent && <LeftComponent /> }
                </HeaderLeftSection>
                <HeaderCenterSection>
                    { CenterComponent && <CenterComponent /> }
                </HeaderCenterSection>
                <HeaderRightSection>
                    { RightComponent && <RightComponent /> }
                </HeaderRightSection>
            </HeaderWrapper>
        </Portal>
    )
}

export default Header