import React from 'react'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const HostPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={() => <HeaderIconButton onPress={stackHeaderProps.navigation.goBack} icon='arrow-left' />}
            CenterComponent={() => <HeaderTitle title='host page' />}
            RightComponent={undefined}
        />
    )
}

export default HostPageHeader