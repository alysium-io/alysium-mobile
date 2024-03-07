import { useTextInput, useUser } from '@hooks'

interface IUseCreateArtist {
    newArtistText: React.RefObject<string>
    setNewArtistText: (newArtistName: string) => void
    submitNewArtist: () => void
    onDismiss: () => void
}

const useCreateArtist = () : IUseCreateArtist => {

    const {
        text: newArtistText,
        setText: setNewArtistText,
        reset: resetNewArtistText
    } = useTextInput()

    const { createArtist } = useUser()

    const submitNewArtist = () => {
        if (newArtistText.current) createArtist(newArtistText.current)
    }

    const onDismiss = () => resetNewArtistText()
    
    return {
        newArtistText,
        setNewArtistText,
        submitNewArtist,
        onDismiss
    }
}

export default useCreateArtist