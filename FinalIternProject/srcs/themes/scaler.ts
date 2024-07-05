//@ts-ignore
import {create} from 'react-native-pixel-perfect';

// base UI design
const baseWidth = 375;
const baseHeight = 812;

const perfectSize = create({width: baseWidth, height: baseHeight});
const scaler = (size: any) => perfectSize(size);

export {scaler};
