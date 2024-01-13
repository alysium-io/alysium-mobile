import { AuthStage } from '@types'
import { AuthPage } from './AuthPage'
import { ErrorPage } from './ErrorPage'
import { LoadingPage } from './LoadingPage'

export default {
    [AuthStage.error]: ErrorPage,
    [AuthStage.loading]: LoadingPage,
    [AuthStage.loggedOut]: AuthPage
}