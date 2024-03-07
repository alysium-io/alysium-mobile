import { useTextInput, useUser } from '@hooks'

interface IUseCreateHost {
    newHostText: React.RefObject<string>
    setNewHostText: (newHostName: string) => void
    submitNewHost: () => void
    onDismiss: () => void
}

const useCreateHost = () : IUseCreateHost => {

    const {
        text: newHostText,
        setText: setNewHostText,
        reset: resetNewHostText
    } = useTextInput()

    const { createHost } = useUser()

    const submitNewHost = () => {
        if (newHostText.current) createHost(newHostText.current)
    }

    const onDismiss = () => resetNewHostText()
    
    return {
        newHostText,
        setNewHostText,
        submitNewHost,
        onDismiss
    }
}

export default useCreateHost