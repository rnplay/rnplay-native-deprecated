var BASE_URL = 'https://rnplay.org';

var Api = {
  get(url, authEmail = '', authToken = '') {
    var platformParam = `?platform=${global.PLATFORM}`

    if (url.contains('?')) {
      platformParam = platformParam.replace("?", "&")
    }
    return fetch(BASE_URL + url + platformParam, {
      method: 'get',
      headers: {
        'X-User-Email': authEmail,
        'X-User-Token': authToken
      }
    }).then((res) => res.json());
  },
  post(url, body = '') {
    return fetch(BASE_URL + url, {
      method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  put(url, body) {
    return fetch(BASE_URL + url, {
      method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  delete(url) {
    return fetch(BASE_URL + url, { method: 'delete' }).then((res) => res.json());
  }
};

module.exports = Api;
