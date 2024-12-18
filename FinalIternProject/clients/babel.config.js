module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      // 'module-resolver',
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@api': './srcs/api',
          '@assets': './srcs/assets',
          '@component': './srcs/component',
          '@constants': './srcs/constants',
          '@firebase': './srcs/firebase',
          '@hooks': './srcs/hooks',
          '@interfaces': './srcs/interfaces',
          '@navigation': './srcs/navigation',
          '@redux': './srcs/redux',
          '@screens': './srcs/screens',
          '@services': './srcs/services',
          '@themes': './srcs/themes',
          '@translations': './srcs/translations',
          '@utils': './srcs/utils',
          '@validates': './srcs/validates',
          '@navigate': './srcs/navigate',
          '@viewpager': './srcs/viewpager',
          '@types': './srcs/types',
          '@stores': './srcs/stores',
          '@storages': './srcs/storages',
          // "@i18n": "./src/i18n",
          "@routes": "./srcs/routes",
          "@services": "./srcs/services",
          // '@env': './src/env.js',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
