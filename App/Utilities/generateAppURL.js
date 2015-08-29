module.exports = (app) => {
  //return `http://localhost:34580${app.bundle_path}`;
  return `http://packager${global.RN_VERSION}.rnplay.org${app.bundle_path}`;
};
