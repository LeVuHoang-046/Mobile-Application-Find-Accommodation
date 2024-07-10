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
          // "@i18n": "./src/i18n",
          // "@routes": "./src/routes",
          // "@services": "./src/services",
          // '@env': './src/env.js',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
