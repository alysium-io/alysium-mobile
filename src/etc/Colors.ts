class Colors {

    // Helper function to validate HEX color
    static isValidHexColor = (color: string): boolean => {
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
    }

    // Helper function to adjust color brightness
    static adjustColorBrightness = (color: string, factor: number, brighten: boolean): string => {

        if (!Colors.isValidHexColor(color)) {
            throw new Error("Invalid HEX color provided.")
        }
    
        // Remove the hash at the start if it's there
        color = color.charAt(0) === '#' ? color.slice(1) : color
    
        // Parse r, g, b values
        const bigint = parseInt(color, 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255
    
        // Adjust each individual RGB value
        const adjust = (value: number): number => 
            brighten ? Math.round(value + (255 - value) * factor) : Math.round(value * (1 - factor))
        const ar = adjust(r)
        const ag = adjust(g)
        const ab = adjust(b)
    
        // Construct the adjusted RGB values back to HEX
        const result = (1 << 24) + (ar << 16) + (ag << 8) + ab
        return `#${result.toString(16).slice(1).toUpperCase()}`
    
    }

    // Helper function to darken color
    static darken = (color: string, factor: number = 0.1): string => {
        return Colors.adjustColorBrightness(color, factor, false)
    }

    // Helper function to brighten color
    static brighten = (color: string, factor: number = 0.1): string => {
        return Colors.adjustColorBrightness(color, factor, true)
    }

}

export default Colors