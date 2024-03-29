import { useContext } from 'react'
import { useSelector, useDispatch } from 'src/redux'
import { ThemeNames, Theme, ThemeState, ThemeMode, AppType } from 'src/types'
import { themes } from 'src/restyle'
import { createTheme } from '@shopify/restyle'
import { ThemeContext } from '../contexts/ThemeContext'
import { themeActions } from 'src/redux/theme'
import {
    SharedValue,
    withTiming
} from 'react-native-reanimated'


interface IUseTheme {
    themeName: string
    mode: ThemeMode
    animatedValue: SharedValue<number>
    setTheme: (theme: ThemeNames) => void
    theme: Theme
    otherTheme: Theme
    toggleMode: () => void
    setMode: (mode: ThemeMode) => void
    getRawColor: (color: string) => string
    isValidColor: (color: string) => boolean
}

const useTheme = () : IUseTheme => {

    const { animatedValue } = useContext(ThemeContext)

    const themeState : ThemeState = useSelector(state => state.theme)
    const dispatch = useDispatch()

    const theme = createTheme(themes[themeState.themeName][themeState.mode])
    const otherTheme = createTheme(themes[themeState.themeName][themeState.mode === ThemeMode.light ? ThemeMode.dark : ThemeMode.light])

    const setTheme = (themeName: ThemeNames) => {
        dispatch(themeActions.setTheme(themeName))
    }

    const toggleMode = () => {
        animatedValue.value = withTiming(themeState.mode === ThemeMode.light ? 0 : 1, { duration: 200 })
        dispatch(themeActions.toggleMode())
    }

    const setMode = (mode: ThemeMode) => {
        animatedValue.value = withTiming(mode === ThemeMode.light ? 0 : 1, { duration: 200 })
        dispatch(themeActions.setMode(mode))
    }

    const getRawColor = (colorName: string) : string => {
        if (!isValidColor(colorName)) {
            return colorName
        }

        return theme.colors[colorName]
    }

    const isValidColor = (color: string) : boolean => {
        return color in theme.colors
    }

    return {
        setTheme,
        mode: themeState.mode,
        themeName: themeState.themeName,
        theme,
        otherTheme,
        toggleMode,
        setMode,
        animatedValue,
        getRawColor,
        isValidColor
    }
}

export default useTheme