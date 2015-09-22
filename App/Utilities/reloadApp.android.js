'use strict';

// var AppReloader = require('NativeModules').AppReloader;
// var UserDefaults = require('react-native-userdefaults-ios');

module.exports = (bundleUrl, moduleName, appName, urlParams) => {
  console.log(`${bundleUrl} ${moduleName} ${appName} ${urlParams}`);
  // urlParams = urlParams ? urlParams : '{}';
  // var params = JSON.parse(urlParams);

  // UserDefaults.setObjectForKey(params, 'rnplayParams')
  // .then(() => {
  //   AppReloader.reloadAppWithURLString(bundleUrl, moduleName, appName);
  // });
};
