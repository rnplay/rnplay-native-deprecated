'use strict';

var AppReloader = require('NativeModules').AppReloader;

module.exports = (bundleUrl, bundlePath, moduleName, appName, urlParams) => {
  bundleUrl = bundleUrl.replace(/http:\/\/|https:\/\//g, '');
  bundlePath = bundlePath.replace('ios.bundle', 'android');
  bundlePath = bundlePath.replace('/js', 'js');

  AppReloader.reloadAppWithURLString(bundleUrl,
                                     bundlePath,
                                     moduleName,
                                     appName);
};
