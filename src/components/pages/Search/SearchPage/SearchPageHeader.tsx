import React from 'react'
import { StackHeaderProps } from '@react-navigation/stack'
import {
    Header,
    HeaderTitle
} from '@organisms'


const SearchPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            CenterComponent={() => <HeaderTitle title='alysium' />}
            RightComponent={undefined}
        />
    )
}

export default SearchPageHeader