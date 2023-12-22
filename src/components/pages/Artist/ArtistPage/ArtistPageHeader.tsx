import React from 'react'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const ArtistPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={() => <HeaderIconButton onPress={stackHeaderProps.navigation.goBack} icon='arrow-left' />}
            CenterComponent={() => <HeaderTitle title='artist page' />}
            RightComponent={undefined}
        />
    )
}

export default ArtistPageHeader