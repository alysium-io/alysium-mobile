import React from 'react'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const EditEventPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={() => <HeaderIconButton onPress={stackHeaderProps.navigation.goBack} icon='arrow-left' />}
            CenterComponent={() => <HeaderTitle title='edit event' />}
            RightComponent={undefined}
        />
    )
}

export default EditEventPageHeader