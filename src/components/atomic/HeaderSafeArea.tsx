import React from 'react'
import { View } from '@atomic'
import { useHeader } from '@organisms'


interface HeaderSafeAreaProps {
    children?: React.ReactNode
}

const HeaderSafeArea : React.FC<HeaderSafeAreaProps> = ({
    children
}) => {

    const { totalHeaderHeight } = useHeader()

    return (
        <View style={{ paddingTop: totalHeaderHeight, flex: 1 }}>
            {children}
        </View>
    )
}

export default HeaderSafeArea