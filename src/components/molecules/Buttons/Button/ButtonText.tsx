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
            variant='paragraph-medium'
            style={{ letterSpacing: 0.5 }}
            color={color}
        >{text}</Text>
    )
}

export default ButtonText