class Axios {
  constructor(config) {
    this.defaults = {
      headers: {
        'content-type': 'application/json'
      }
    }
    Object.assign(this.defaults, config)
  }

  get(url, headers) {
    this.send('GET', this.defaults.baseURI ? this.defaults.baseURI + url : url, headers)
  }

  post(url, data, headers) {
    this.send('POST', this.defaults.baseURI ? this.defaults.baseURI + url : url, headers, data)
  }

  send(method, url, headers = {}, data) {
    return new Promise((resolve, reject) => {
      let temp_headers = Object.assign({}, this.defaults, headers)
      let xhr = new XMLHttpRequest()
      xhr.open(method, url)
      Object.keys(temp_headers).forEach(attr => {
        xhr.setRequestHeader(attr, temp_headers[attr])
      })
      xhr.onload = () => {
        if (xhr.status === 200) {
          resolve({
            status: xhr.status,
            data: JSON.parse(xhr.responseText)
          })
        } else {
          reject({
            status: xhr.status,
            data: JSON.parse(xhr.responseText)
          })
        }
      }
      switch (method) {
        case 'GET': {
          xhr.send()
          break
        }
        case 'POST': {
          if (temp_headers['content-type'] === 'application/json') {
            xhr.send(JSON.stringify(data))
          }
          if (temp_headers['content-type'] === 'application/x-www-form-urlencoded') {
            xhr.send(this.objectToQueryString(data))
          }
          break
        }

      }

    })

  }

  objectToQueryString(obj) {
    return Object.keys(obj).map(key => {
      return ''.concat(encodeURIComponent(key), '=').concat(encodeURIComponent(obj[key]))
    }).join('&')

  }


}

