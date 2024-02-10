import React from 'react'
import { Header, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const EventCandidatesPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={undefined}
            CenterComponent={() => <HeaderTitle title='event candidates' />}
            RightComponent={undefined}
        />
    )
}

export default EventCandidatesPageHeader