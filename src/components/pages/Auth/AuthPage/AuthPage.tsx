import React, { useState } from 'react'
import { BasePage } from '@organisms'
import { LogIn, CreateAccount } from './components'


const AuthPage = () => {

    const [isLoggingIn, setIsLoggingIn] = useState<boolean>(true)

    return (
        <BasePage>
            {
                isLoggingIn ?
                    <LogIn
                        toggleAuthScreen={() => setIsLoggingIn(false)}
                    />
                    :
                    <CreateAccount
                        toggleAuthScreen={() => setIsLoggingIn(true)}
                    />
            }
        </BasePage>
    )
}

export default AuthPage