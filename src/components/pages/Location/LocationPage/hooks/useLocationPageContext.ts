import { useContext } from 'react'
import { LocationPageContext, LocationPageContextType } from '../contexts/LocationPageContext'

const useLocationPageContext = () : LocationPageContextType => {

    const context = useContext(LocationPageContext)

    if (!context) {
        throw new Error('useLocationPageContext must be used within a LocationPageContextProvider')
    }
    
    return context
}

export default useLocationPageContext