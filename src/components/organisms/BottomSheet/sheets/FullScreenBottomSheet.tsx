import React from 'react'
import { BottomSheet } from '../base'
import { ScrollView } from '@atomic'
import { BottomSheetView, BottomSheetProps } from '@gorhom/bottom-sheet'
import { SheetApi } from '@hooks'
import { useHeader } from '@organisms'
import { useWindowDimensions } from 'react-native'


interface FullScreenBottomSheetProps extends BottomSheetProps {
    sheetApi: SheetApi
    children: React.ReactNode
}

const FullScreenBottomSheet : React.FC<FullScreenBottomSheetProps> = ({
    sheetApi,
    children,
    ...props
}) => {

    const { totalHeaderHeight } = useHeader()
    const { height } = useWindowDimensions()

    return (
        <BottomSheet
            sheetRef={sheetApi.sheetRef}
            snapPoints={[height - totalHeaderHeight]}
            customHandle={() => null}
            enablePanDownToClose={false}
            enableContentPanningGesture={false}
            borderRadius={false}
            {...props}
        >
            <BottomSheetView>
                <ScrollView>
                    {children}
                </ScrollView>
            </BottomSheetView>
        </BottomSheet>
    )
}

export default FullScreenBottomSheet