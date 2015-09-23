'use strict';

// var AppReloader = require('NativeModules').AppReloader;
// var UserDefaults = require('react-native-userdefaults-ios');
var Alert = require('../Components/Alert');

module.exports = (bundleUrl, moduleName, appName, urlParams) => {
  console.log(`${bundleUrl} ${moduleName} ${appName} ${urlParams}`);
  Alert.alert('Sorry', 'This feature is not yet available for Android.');
  // urlParams = urlParams ? urlParams : '{}';
  // var params = JSON.parse(urlParams);

  // UserDefaults.setObjectForKey(params, 'rnplayParams')
  // .then(() => {
  //   AppReloader.reloadAppWithURLString(bundleUrl, moduleName, appName);
  // });
};
