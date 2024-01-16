import { useContext } from 'react'
import { EventManagerPageContext, EventManagerPageContextType } from '../contexts'

const useEventManagerPageContext = () : EventManagerPageContextType => {

    const context = useContext(EventManagerPageContext)

    if (!context) {
        throw new Error('useEventManagerPage must be used within a EventManagerPageProvider')
    }

    return context

}

export default useEventManagerPageContext