module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-paper/babel',
    'react-native-reanimated/plugin',
    'react-native-worklets-core/plugin',
  ],
};

// const path = require('path')
// const pak = require('../package.json')

// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     ['react-native-reanimated/plugin'],
//     ['react-native-worklets-core/plugin'],
//     [
//       'module-resolver',
//       {
//         alias: {
//           [pak.name]: path.join(__dirname, '..', pak.source),
//         },
//       },
//     ],
//   ],
// }
