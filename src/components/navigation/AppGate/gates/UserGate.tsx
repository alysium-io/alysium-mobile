import React, { useEffect } from 'react'
import { useUser } from '@hooks'


interface UserGateProps {
    children?: React.ReactNode
}

const UserGate : React.FC<UserGateProps> = ({
    children
}) => {

    const { user, getUserDetails } = useUser()

    useEffect(() => {
        if (user.user === null) {
            getUserDetails()
        }
    }, [user.user?.id])

    if (user.isLoading) {
        return <></>
    }

    return children
}

export default UserGate