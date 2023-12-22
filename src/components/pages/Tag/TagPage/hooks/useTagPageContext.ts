import { useContext } from 'react'
import { TagPageContext, TagPageContextType } from '../contexts/TagPageContext'

const useTagPageContext = () : TagPageContextType => {

    const context = useContext(TagPageContext)

    if (!context) {
        throw new Error('useTagPageContext must be used within a TagPageContextProvider')
    }
    
    return context
}

export default useTagPageContext