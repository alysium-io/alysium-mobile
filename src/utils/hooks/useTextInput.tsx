import React, { useRef } from 'react'


interface useTextInputProps {
    value: React.RefObject<string>;
    set: (text: string) => void;
    get: () => string;
    clear: () => void;
}

const useTextInput = (defaultText: string = '') : useTextInputProps => {

    const value = useRef<string>(defaultText)

    const clear = () : void => { value.current = '' }
    
    const get = () : string => value.current || ''
    const set = (text: string) : void => { value.current = text }

    return {
        value,
        get,
        set,
        clear
    }

}

export default useTextInput