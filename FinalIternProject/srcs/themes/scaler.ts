//@ts-ignore
import {create} from 'react-native-pixel-perfect';

// base UI design
const baseWidth = 393;
const baseHeight = 759;

const perfectSize = create({width: baseWidth, height: baseHeight});
const scaler = (size: any) => perfectSize(size);

export {scaler};
