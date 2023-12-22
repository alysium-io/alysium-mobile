import { useNavigation as useRNNavigation } from '@react-navigation/native'


interface IUseGenericNavigation {
    back: () => void
}

const useGenericNavigation = () : IUseGenericNavigation => {

    const navigation = useRNNavigation()

    const back = () => navigation.goBack()
    
    return {
        back
    }
}

export default useGenericNavigation