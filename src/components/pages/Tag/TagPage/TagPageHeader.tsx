import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import { Header, HeaderIconButton, HeaderTitle } from '@organisms'


const TagPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={() => <HeaderIconButton onPress={stackHeaderProps.navigation.goBack} icon='arrow-left' />}
            CenterComponent={() => <HeaderTitle title='tag page' />}
            RightComponent={undefined}
        />
    )
}

export default TagPageHeader