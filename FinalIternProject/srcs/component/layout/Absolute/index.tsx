import { forwardRef } from "react";
import { BoxForwardRef } from "../layout.type";
import { Box } from "../Box";

export const Absolute: BoxForwardRef = forwardRef((props,ref)=> {
    return <Box ref={ref} position="absolute" {...props}/>
})