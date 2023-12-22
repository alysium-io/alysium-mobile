import { useDispatch, useSelector } from '@redux'
import { AppType, SettingsState } from '@types'
import { action_setApp } from 'src/redux/settings'
import { action_setMode } from 'src/redux/theme'
import useTheme from './useTheme'


interface IUseSettings {
    app: AppType
    setApp: (app: AppType) => void
}

const useSettings = () : IUseSettings => {

    const settingsState : SettingsState = useSelector(state => state.settings)
    const dispatch = useDispatch()
    const { getModeByApp } = useTheme()

    const setApp = (app: AppType) => {
        dispatch(action_setMode(getModeByApp(app)))
        dispatch(action_setApp(app))
    }
    
    return {
        app: settingsState.app,
        setApp
    }
}

export default useSettings