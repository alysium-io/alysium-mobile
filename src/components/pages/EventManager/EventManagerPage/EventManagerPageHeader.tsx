import React from 'react'
import { Header, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const EventManagerPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={undefined}
            CenterComponent={() => <HeaderTitle title='event manager' />}
            RightComponent={undefined}
        />
    )
}

export default EventManagerPageHeader