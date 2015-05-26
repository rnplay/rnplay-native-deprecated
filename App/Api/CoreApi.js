var Api = {
    
  get(url) {
    return fetch(url).then((res) => res.json());
  },
  post(url, body) {
    return fetch(url, {
      method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  put(url, body) {
    return fetch(url, {
      method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(body)
    }).then((res) => res.json());
  },
  delete(url) {
    return fetch(url, { method: 'delete' }).then((res) => res.json());
  }
};

module.exports = Api;