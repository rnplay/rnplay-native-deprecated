var RN_VERSION = require('../../package.json').dependencies['react-native'];
var githubPrefix = 'facebook/react-native#';
if (RN_VERSION.indexOf(githubPrefix) === 0) {
  RN_VERSION = RN_VERSION.replace(githubPrefix, '');
} else {
  RN_VERSION = RN_VERSION.replace(/\./g,'').replace(/-/g, '')
}

module.exports = (app) => {
  return `http://packager${RN_VERSION}.rnplay.org/${app.url_token}.bundle`;
};
