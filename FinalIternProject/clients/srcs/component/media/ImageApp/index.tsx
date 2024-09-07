import React from 'react';
import {ImageRequireSource, StyleProp, View, ViewStyle} from 'react-native';
import FastImage, {FastImageProps, Source} from 'react-native-fast-image';
import { useImageApp } from './ImageApp.func';
import { SkeletonFastImage } from './SkeletonFastImage';
import { styles } from './ImageApp.style';
import { Images } from '@assets';


export type SourceImageType = Source | ImageRequireSource | undefined;

type ImageAppProps = {
  uri?: string | null;
  stylesPlaceholder?: StyleProp<ViewStyle>;
} & FastImageProps;

export const ImageApp: React.FC<ImageAppProps> = ({
  uri,
  stylesPlaceholder,
  source,
  resizeMode,
  ...props
}) => {
  const {loading, error, onLoadStart, onLoad, onError} = useImageApp();

  if (!uri || (error && !loading)) {
    return (
      <FastImage
        source={source}
        resizeMode={error ? 'contain' : resizeMode}
        {...props}
      />
    );
  }

  return (
    <View>
      <FastImage
        source={{
          uri: uri ?? undefined,
          priority: FastImage.priority.high,
          cache: FastImage.cacheControl.immutable,
        }}
        {...props}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoad}
        onError={onError}
        defaultSource={Images.bgImg1}
      />
      {loading && (
        <View
          style={[
            props?.style,
            styles.containerPlaceholder,
            stylesPlaceholder,
          ]}>
          <SkeletonFastImage />
        </View>
      )}
    </View>
  );
};

export default ImageApp;
