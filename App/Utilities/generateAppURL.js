module.exports = (app) => {
  if(__DEV__) {
    return `http://{process.env.NGROK_PACKGER_SUBDOMAIN}.ngrok.io${app.bundle_path}`;
  } else {
    return `http://packager${global.RN_VERSION}.rnplay.org${app.bundle_path}`;
  }
};
