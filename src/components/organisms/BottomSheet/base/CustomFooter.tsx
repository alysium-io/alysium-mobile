import React from 'react'
import { View } from '@atomic'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BottomSheetFooter, BottomSheetFooterProps } from '@gorhom/bottom-sheet'


interface CustomFooterProps extends BottomSheetFooterProps {
    children: React.ReactNode
}

const CustomFooter : React.FC<CustomFooterProps> = ({
    children,
    ...props
}) => {

    const insets = useSafeAreaInsets()

    return (
        <BottomSheetFooter {...props} bottomInset={insets.bottom}>
            <View marginHorizontal='m'>
                {children}
            </View>
        </BottomSheetFooter>
    )
}

export default CustomFooter