// theme.js

// 1. import `extendTheme` function
import { extendTheme } from '@chakra-ui/react'

// 2. Add your color mode config
const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
}

const styles = {
    global: {
        'html, body': {
            bg: 'gray.200'
        }
    }
}

// 3. extend the theme
const theme = extendTheme({ config, styles })

export default theme
