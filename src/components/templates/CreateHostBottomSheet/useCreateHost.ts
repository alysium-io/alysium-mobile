import { useUser } from '@hooks'
import { useState } from 'react'

interface IUseCreateHost {
    newHostName: string
    setNewHostName: (newHostName: string) => void
    submitNewHost: () => void
}

const useCreateHost = () : IUseCreateHost => {

    const [newHostName, setNewHostName] = useState<string>('')

    const { createHost } = useUser()

    const submitNewHost = () => {
        createHost(newHostName)
    }
    
    return {
        newHostName,
        setNewHostName,
        submitNewHost
    }
}

export default useCreateHost