const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
// const config = {};
const config = {
  watchFolders: [path.resolve(__dirname, './src')],
};

module.exports = mergeConfig(defaultConfig, config);

// module.exports = mergeConfig(getDefaultConfig(__dirname), config);
