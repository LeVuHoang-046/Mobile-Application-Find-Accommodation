import { Box, BoxForwardRef } from '@component';
import React, {forwardRef} from 'react';


export const Column: BoxForwardRef = forwardRef((props, ref) => {
  return <Box ref={ref} align="center" flexDirection="column" {...props} />;
});
