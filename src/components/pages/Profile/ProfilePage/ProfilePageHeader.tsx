import React from 'react'
import { Header, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const ProfilePageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={undefined}
            CenterComponent={() => <HeaderTitle title='profile page' />}
            RightComponent={undefined}
        />
    )
}

export default ProfilePageHeader