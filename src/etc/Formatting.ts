class Formatting {

    static formatPhoneNumber = (input: string) : string => {
        /**
         * Function that formats a phone number to (XXX) XXX-XXXX
         */

        // Strip all characters from the input except digits
        input = Formatting.cleanStringToNumber(input)

        // Trim the remaining input to ten characters, to preserve phone number format
        input = input.substring(0, 10)

        // Based upon the length of the string, we add formatting as necessary
        let size = input.length
        if (size == 0) {
            input = input
        } else if (size < 4) {
            input = '(' + input
        } else if (size < 7) {
            input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6)
        } else {
            input =
                '(' +
                input.substring(0, 3) +
                ') ' +
                input.substring(3, 6) +
                '-' +
                input.substring(6, 10)
        }
        return input
    }

    static cleanStringToNumber = (input: string) : string => {
        /**
         * Function that removes all non-numeric characters from a string
         */

        return input.replace(/\D/g, '')
    }

    static formatCommaSeparatedNumber = (input: string) : string => {
        /**
         * Function that formats a number to include commas
         */

        if (input === '') {
            return ''
        }

        // Strip all characters from the input except digits
        input = Formatting.cleanStringToNumber(input)

        // You must pass a number to the `toLocaleString` function
        return parseInt(input).toLocaleString()
    }

}

export default Formatting