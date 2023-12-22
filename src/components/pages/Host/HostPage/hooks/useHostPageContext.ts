import { useContext } from 'react'
import { HostPageContext, HostPageContextType } from '../contexts'

const useHostPageContext = () : HostPageContextType => {

    const context = useContext(HostPageContext)

    if (!context) {
        throw new Error('useHostPage must be used within a HostPageProvider')
    }

    return context

}

export default useHostPageContext