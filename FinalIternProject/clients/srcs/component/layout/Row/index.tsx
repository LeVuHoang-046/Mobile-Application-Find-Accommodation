import React, {forwardRef} from 'react';
import {BoxForwardRef} from '../layout.type';
import { Box } from '../Box';


export const Row: BoxForwardRef = forwardRef((props, ref) => {
  return <Box ref={ref} align="center" flexDirection="row" {...props} />;
});
