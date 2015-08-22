if(__DEV__) {
  var BASE_URL = 'http://localhost:34560';
} else {
  var BASE_URL = 'https://rnplay.org';  
}

var Api = {

  get(url) {
    return fetch(BASE_URL + url).then((res) => res.json());
  },
  post(url, body) {
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
