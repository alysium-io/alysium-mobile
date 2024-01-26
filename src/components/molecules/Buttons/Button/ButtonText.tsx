import React from 'react'
import { Text } from '@atomic'


interface ButtonTextProps {
    text: string
    color: string
}

const ButtonText : React.FC<ButtonTextProps> = ({
    text,
    color
}) => {

    return (
        <Text
            animated
            variant='paragraph'
            color={color}
        >{text}</Text>
    )
}

export default ButtonText