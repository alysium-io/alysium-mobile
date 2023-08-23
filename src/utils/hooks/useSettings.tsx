import { useSelector, useDispatch } from 'src/redux'
import { ThemeName, Theme, SettingsState } from 'src/types'
import { action_setTheme } from 'src/redux/settings'
import { themes } from 'src/restyle'
import { createTheme } from '@shopify/restyle'


interface IUseSettings {
    setTheme: (theme: ThemeName) => void;
    theme: Theme;
}

const useSettings = () : IUseSettings => {

    const settings : SettingsState = useSelector(state => state.settings)
    const dispatch = useDispatch()

    const setTheme = (themeName: ThemeName) => {
        dispatch(action_setTheme(themeName))
    }

    return {
        setTheme,
        theme: createTheme(themes[settings.theme])
    }
}

export default useSettings