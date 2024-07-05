import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    colors: {
        primary: {
            lightPink: '#FFDDD2',
            coral: '#E29578',
            turquoise: '#83C5BE',
            teal: '#006D77',
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
                bg: '#C2DFE3',
                color: '#253237',  //"#5C6B73",
                _hover: {
                    background: '#405861',
                    color: "#C2DFE3",
                },
            },
        },
        IconButton: {
            baseStyle: {
                bg: '#C2DFE3',
                color: '#253237',  //"#5C6B73",
                _hover: {
                    background: '#405861',
                    color: "#C2DFE3",
                },
            },
            deleteIconStyle: {
                bg: '#C2DFE3',
                color: '#253237',  //"#5C6B73",
                _hover: {
                    background: '#405861',
                    color: "#C2DFE3",
                },
            },
        }, 
        Heading: {
            baseStyle: {
                color: 'black'
            }
        }, 
        Text: {
            baseStyle: {
                color: 'black',
            }
        },
    }
})

export default theme