import React from 'react'
import { View } from '@atomic'


interface ListContainerProps {
    children: React.ReactNode
}

const ListContainer : React.FC<ListContainerProps> = ({
    children
}) => {

    return (
        <View>
            {children}
        </View>
    )
}

export default ListContainer