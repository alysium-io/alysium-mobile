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

    static hex2Rgb = (hexColor: string) : [number, number, number] => {

        const bigint = parseInt(hexColor.slice(1), 16)
        const r = (bigint >> 16) & 255
        const g = (bigint >> 8) & 255
        const b = bigint & 255
    
        return [r, g, b]
    
    }
    
    static hexToRGBA = (hexColor: string, alpha: number = 1) : string => {
        
        const rgb = Colors.hex2Rgb(hexColor)
        return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`
    
    }

    static RGB2Hex = (rgbColor: number[]) => {
        return (
            '#' +
            rgbColor
                .map((val) => {
                    return val.toString(16).padStart(2, '0')
                })
                .join('')
        )
    }

    static normalizeColorToRange = (hexColor: string, minRgb: number = 159, maxRgb: number = 239) => {

        const rgbColor = Colors.hex2Rgb(hexColor)
        const minInputRgb = Math.min(...rgbColor)
        const maxInputRgb = Math.max(...rgbColor)
    
        // Handle edge case when input color has equal min and max RGB values
        if (minInputRgb === maxInputRgb) {
            const midRgb = minRgb + Math.floor((maxRgb - minRgb) / 2)
            return Colors.RGB2Hex([midRgb, midRgb, midRgb])
          }
    
        const adjustedRgbColor = rgbColor.map((val) => {
            return Math.floor(Colors.scaleValue(val, minInputRgb, maxInputRgb, minRgb, maxRgb))
        })
    
        return Colors.RGB2Hex(adjustedRgbColor)
    
    }

    static scaleValue = (value: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin
    }

}

export default Colors