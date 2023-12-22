import React from 'react'
import { SheetRef, useTheme } from '@hooks'
import { AppType, ThemeMode } from '@types'
import { useSettings } from '@hooks'
import {
    BottomSheet,
    BottomSheetHeader,
    BottomSheetListItem,
    BottomSheetListItemWithToggle
} from '@organisms'


interface AppBetaConfigBottomSheetProps {
    sheetRef: SheetRef
}

const AppBetaConfigBottomSheet : React.FC<AppBetaConfigBottomSheetProps> = ({
    sheetRef
}) => {

    const { setApp } = useSettings()
    const { toggleMode, mode } = useTheme()

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetHeader text='Config' />
            <BottomSheetListItem
                text='Host App'
                onPress={() => setApp(AppType.host)}
                icon='host'
                border
            />
            <BottomSheetListItem
                text='Artist App'
                onPress={() => setApp(AppType.artist)}
                icon='artist'
                border
            />
            <BottomSheetListItem
                text='User App'
                onPress={() => setApp(AppType.user)}
                icon='user'
                border
            />
            <BottomSheetListItem
                text='Test App'
                onPress={() => setApp(AppType.test)}
                icon='experiment'
                border
            />
            <BottomSheetListItemWithToggle
                text='Light/Dark Mode'
                onToggle={toggleMode}
                value={mode === ThemeMode.dark}
                border
            />
        </BottomSheet>
    )
}

export default AppBetaConfigBottomSheet