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
    },
  },
});

export default theme;
