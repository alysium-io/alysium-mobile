import React from 'react'
import { Header, HeaderTitle } from '@organisms'
import { StackHeaderProps } from '@react-navigation/stack'


const ContractManagerPageHeader : React.FC<StackHeaderProps> = (stackHeaderProps) => {

    return (
        <Header
            stackHeaderProps={stackHeaderProps}
            LeftComponent={undefined}
            CenterComponent={() => <HeaderTitle title='contract manager' />}
            RightComponent={undefined}
        />
    )
}

export default ContractManagerPageHeader