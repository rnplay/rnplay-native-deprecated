'use strict';

var AppReloader = require('NativeModules').AppReloader;
var UserDefaults = require('react-native-userdefaults-ios');

module.exports = (bundleUrl, bundlePath, moduleName, appName, urlParams) => {
  urlParams = urlParams ? urlParams : '{}';
  var params = JSON.parse(urlParams);

  UserDefaults.setObjectForKey(params, 'rnplayParams')
  .then(() => {
    AppReloader.reloadAppWithURLString(bundleUrl + bundlePath,
                                       moduleName,
                                       appName);
  });
};
