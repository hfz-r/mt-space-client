import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Work Sans, system-ui, sans-serif',
  },
  shadows: {
    largeSoft: 'rgba(60, 64, 67, 0.15) 0px 2px 10px 6px;',
  },
  styles: {
    global: {
      'html, #root': {
        height: '100%',
      },
      '#root': {
        display: 'flex',
        flexDirection: 'column',
      },
      body: {
        overflowY: 'scroll',
      },
      html: {
        scrollBehavior: 'smooth',
      },
      /* width */
      '::-webkit-scrollbar': {
        width: '10px',
      },
      /* Track */
      '::-webkit-scrollbar-track': {
        background: '#eee',
      },
      /* Handle */
      '::-webkit-scrollbar-thumb': {
        background: '#999',
      },
      /* Handle on hover */
      '::-webkit-scrollbar-thumb:hover': {
        background: '#888',
      },
    },
  },
});

export default theme;
