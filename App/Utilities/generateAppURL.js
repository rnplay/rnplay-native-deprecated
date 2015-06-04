module.exports = (app) => {
  return `http://packager${global.RN_VERSION}.rnplay.org/${app.url_token}.bundle`;
};
