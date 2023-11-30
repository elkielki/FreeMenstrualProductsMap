import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        primary: {
            100: '#EAF5FD',
            200: '#D5EAFC',
            300: '#BEDAF8',
            400: '#ABCAF1',
        }
    },

    fonts: {
        heading: `'Open Sans', sans-serif`,
        body: `'Open Sans', sans-serif`,
    },

    components: {
        Button: {
        // 1. We can update the base styles
            baseStyle: {
                fontWeight: 'bold', // Normally, it is "semibold"
                bg: 'primary.400',
            },
            // 2. We can add a new button size or extend existing
            sizes: {
                xl: {
                    h: '56px',
                    fontSize: 'lg',
                    px: '32px',
                },
            },
            // 3. We can add a new visual variant
            variants: {
                'with-shadow': {
                bg: 'primary.300',
                boxShadow: '0 0 2px 2px #efdfde',
                },
                // 4. We can override existing variants
            /*    solid: () => ({
                bg: props.colorMode === 'dark' ? 'red.300' : 'red.500',
                }),
                // 5. We can add responsive variants
                sm: {
                bg: 'teal.500',
                fontSize: 'md',
                },
            },  */
                // 6. We can overwrite defaultProps
                defaultProps: {
                    size: 'lg', // default is md
                    variant: 'sm', // default is solid
                    colorScheme: 'gray', // default is gray
                },
            },
        },
    }
})

export default theme