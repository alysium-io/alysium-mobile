import React, { useMemo } from 'react'
import { useTheme, SheetRef, useKeyboard } from '@hooks'
import { Easing, SharedValue } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBottomSheetMaxHeight } from '../hooks'
import { ThemeMode } from '@types'
import BottomSheetHandle from './BottomSheetHandle'
import BottomSheetBackdrop from './BottomSheetBackdrop'
import {
    BottomSheetModal,
    useBottomSheetTimingConfigs,
    BottomSheetFooterProps,
    BottomSheetHandleProps,
    BottomSheetView
} from '@gorhom/bottom-sheet'


const colorScheme = {
    [ThemeMode.dark]: {
        background: 'bg2',
        border: 'bg3'
    },
    [ThemeMode.light]: {
        background: 'bg1',
        border: 'bg2'
    }
}

interface BottomSheetProps {
    sheetRef: SheetRef
    children?: React.ReactNode
    onDismiss?: () => void
    snapPoints?: readonly (string | number)[] | SharedValue<(string | number)[]> | undefined
    maxHeight?: string
    footerComponent?: React.FC<BottomSheetFooterProps> | undefined
    customHandle?: React.FC<BottomSheetHandleProps> | undefined
    enablePanDownToClose?: boolean
    enableContentPanningGesture?: boolean
    borderRadius?: boolean
    backgroundColor?: string
    borderColor?: string
    onChange?: (index: number) => void
}

const BottomSheet = ({
    children,
    sheetRef,
    onDismiss,
    maxHeight = '90%',
    snapPoints,
    footerComponent,
    customHandle = BottomSheetHandle,
    enablePanDownToClose = true,
    enableContentPanningGesture = false,
    borderRadius = true,
    backgroundColor,
    borderColor,
    onChange
} : BottomSheetProps) => {

    const { isVisible } = useKeyboard()
    const { mode, getRawColor } = useTheme()
    const insets = useSafeAreaInsets()

    const easingConfig = useMemo(() => Easing.inOut(Easing.cubic), [])

    const animationConfigs = useBottomSheetTimingConfigs({
        duration: 400,
        easing: easingConfig
    })

    const maxHeightStyle = useBottomSheetMaxHeight(maxHeight)

    return (
        <BottomSheetModal
            onDismiss={onDismiss}
            ref={sheetRef}
            index={0}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={customHandle}
            enablePanDownToClose={enablePanDownToClose}
            animationConfigs={animationConfigs}
            enableDynamicSizing={snapPoints ? false : true}
            snapPoints={snapPoints}
            footerComponent={footerComponent}
            enableContentPanningGesture={enableContentPanningGesture}
            backgroundStyle={{
                backgroundColor: backgroundColor || getRawColor(colorScheme[mode].background),
                borderRadius: borderRadius ? 25 : 0,
                borderTopWidth: borderColor ? 1 : 0,
                borderTopColor: borderColor || getRawColor(colorScheme[mode].border)
            }}
            onChange={onChange}
        >
            <BottomSheetView
                style={[
                    {
                        maxHeight: maxHeightStyle,
                        paddingBottom: isVisible ? 0 : insets.bottom
                    }
                ]}
            >
                { children }
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default BottomSheet