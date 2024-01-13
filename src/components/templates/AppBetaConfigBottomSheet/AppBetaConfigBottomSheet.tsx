import React from 'react'
import { SheetRef, useTheme } from '@hooks'
import { Persona, ThemeMode } from '@types'
import { usePersona } from '@hooks'
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

    const { setPersona } = usePersona()
    const { toggleMode, mode } = useTheme()

    return (
        <BottomSheet sheetRef={sheetRef}>
            <BottomSheetHeader text='Config' />
            {/* <BottomSheetListItem
                text='Host App'
                onPress={() => setPersona(Persona.host)}
                icon='host'
                border
            />
            <BottomSheetListItem
                text='Artist App'
                onPress={() => setPersona(Persona.artist)}
                icon='artist'
                border
            />
            <BottomSheetListItem
                text='User App'
                onPress={() => setPersona(Persona.user)}
                icon='user'
                border
            />
            <BottomSheetListItemWithToggle
                text='Light/Dark Mode'
                onToggle={toggleMode}
                value={mode === ThemeMode.dark}
                border
            /> */}
        </BottomSheet>
    )
}

export default AppBetaConfigBottomSheet