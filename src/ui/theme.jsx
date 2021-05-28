import React from 'react';

import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { POPUP_WINDOW } from '../config/config';
import { Scrollbars } from 'react-custom-scrollbars';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        width: POPUP_WINDOW.width + 'px',
        height: POPUP_WINDOW.height + 'px',
        overflowX: 'hidden',
      },
    },
  },
});

const Theme = (props) => {
  return (
    <ChakraProvider theme={theme}>
      <Scrollbars
        style={{ width: POPUP_WINDOW.width, height: POPUP_WINDOW.height }}
        autoHide
      >
        {props.children}
      </Scrollbars>
    </ChakraProvider>
  );
};

export default Theme;
