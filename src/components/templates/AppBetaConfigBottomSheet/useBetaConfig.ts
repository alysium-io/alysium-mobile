import { useContext } from 'react'
import { AppBetaConfigBottomSheetContext } from './AppBetaConfigBottomSheetContext'
import { SheetApi } from '@hooks'

interface IUserBetaConfig {
    betaConfigSheetApi: SheetApi
}

const useBetaConfig = () : IUserBetaConfig => {

    const context = useContext(AppBetaConfigBottomSheetContext)

    return {
        betaConfigSheetApi: context.appBetaConfigSheetApi
    }

}

export default useBetaConfig