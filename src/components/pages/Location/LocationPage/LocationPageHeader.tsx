import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'


const LocationPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={() => <HeaderIconButton onPress={stackHeaderProps.navigation.goBack} icon='arrow-left' color='meteor' />}
            CenterComponent={() => <HeaderTitle title='location page' />}
            RightComponent={undefined}
        />
    )
}

export default LocationPageHeader