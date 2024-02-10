import React, { useMemo } from 'react'
import { useTheme, SheetRef, useKeyboard } from '@hooks'
import { Easing } from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useBottomSheetMaxHeight } from '../hooks'
import { ThemeMode } from '@types'
import BottomSheetHandle from './BottomSheetHandle'
import BottomSheetBackdrop from './BottomSheetBackdrop'
import {
    BottomSheetModal,
    useBottomSheetTimingConfigs,
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

type BottomSheetProps = React.ComponentProps<typeof BottomSheetModal> & {
    children?: React.ReactNode
    sheetRef: SheetRef
    maxHeight?: string
    customHandle?: React.FC<BottomSheetHandleProps>
    borderRadius?: boolean
    backgroundColor?: string
    borderColor?: string
    contentContainerStyle?: React.ComponentProps<typeof BottomSheetView>['style']
}

const BottomSheet : React.FC<BottomSheetProps> = ({
    children,
    sheetRef,
    backgroundColor,
    borderColor,
    maxHeight = '90%',
    customHandle = BottomSheetHandle,
    enablePanDownToClose = true,
    enableContentPanningGesture = false,
    borderRadius = true,
    contentContainerStyle,
    ...props
}) => {

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
            ref={sheetRef}
            index={0}
            backdropComponent={BottomSheetBackdrop}
            handleComponent={customHandle}
            enablePanDownToClose={enablePanDownToClose}
            animationConfigs={animationConfigs}
            enableDynamicSizing={props.snapPoints ? false : true}
            enableContentPanningGesture={enableContentPanningGesture}
            backgroundStyle={{
                backgroundColor: backgroundColor || getRawColor(colorScheme[mode].background),
                borderRadius: borderRadius ? 25 : 0,
                borderTopWidth: borderColor ? 1 : 0,
                borderTopColor: borderColor || getRawColor(colorScheme[mode].border)
            }}
            {...props}
        >
            <BottomSheetView
                style={[
                    {
                        maxHeight: maxHeightStyle,
                        paddingBottom: isVisible ? 0 : insets.bottom
                    },
                    contentContainerStyle
                ]}
            >
                { children }
            </BottomSheetView>
        </BottomSheetModal>
    )
}

export default BottomSheet