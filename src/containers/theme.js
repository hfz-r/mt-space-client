import { extendTheme } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const theme = extendTheme({
  fonts: {
    heading: "'Red Hat Display', sans-serif",
    body: "'Red Hat Text', sans-serif",
  },
  styles: {
    global: props => ({
      body: {
        color: mode('gray.700', 'whiteAlpha.900')(props),
        bg: mode('gray.50', 'gray.900')(props),
        fontSize: '1.2em',
        '.deleted': {
          color: '#ff8383 !important',
          fontStyle: 'normal !important',
        },
        '.inserted': {
          color: '#b5f4a5 !important',
          fontStyle: 'normal !important',
        },
      },
      a: {
        color: mode('blue.500', 'blue.200')(props),
        transition: 'color 0.15s',
        transitionTimingFunction: 'ease-out',
        fontWeight: '500',
        _hover: {
          color: mode('blue.600', 'blue.300')(props),
        },
      },
      /* width */
      '::-webkit-scrollbar': {
        width: '10px',
      },
      /* Track */
      '::-webkit-scrollbar-track': {
        background: '#f1f1f1',
      },
      /* Handle */
      '::-webkit-scrollbar-thumb': {
        background: '#888',
      },
      /* Handle on hover */
      '::-webkit-scrollbar-thumb:hover': {
        background: '#555',
      },
    }),
  },
  components: {
    Heading: {
      baseStyle: props => ({
        borderBottom: '1px',
        borderColor: mode('gray.200', 'gray.700')(props),
        pb: 2,
        fontWeight: '500',
      }),
    },
    Button: {
      baseStyle: {
        fontWeight: '500',
        rounded: 'xl',
      },
    },
    Tag: {
      baseStyle: {
        rounded: 'lg',
      },
    },
    textarea: {
      baseStyle: {
        background: 'green.300',
      },
    },
    Link: {
      baseStyle: {
        fontWeight: 'inherit',
        _hover: {
          textDecoration: 'none',
        },
      },
      variants: {
        text: {
          color: 'blue.400',
          transition: 'color 0.15s',
          transitionTimingFunction: 'ease-out',
          fontWeight: '500',
          _hover: {
            color: 'blue.300',
          },
        },
        gradient: {
          bgGradient: 'linear(to-br, blue.400,blue.300)',
          bgClip: 'text',
          fontWeight: '500',
          _hover: {
            bgGradient: 'linear(to-br, blue.500,blue.300)',
            bgClip: 'text',
          },
        },
      },
    },
  },
});

export default theme;
