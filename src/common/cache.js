var cache = {};

export default {
  set(key, value) {
    return new Promise(function (resolve, reject) {
      localStorage.setItem(key, JSON.stringify(value));
      cache[key] = value;
      resolve(value);
    });
  },
  get(key) {
    return new Promise(function (resolve, reject) {
      let value = cache[key];
      if (value) resolve(value);
      value = localStorage.getItem(key);
      value = JSON.parse(value);
      if (value) resolve(value);
      else reject({message: 'cache error'});
    });
  },
  remove(...keys) {
    return new Promise(function (resolve, reject) {
      keys.forEach((key) => {
        cache[key] = undefined;
        localStorage.removeItem(key);
      });
      resolve();
    });
  },
  clear() {
    return new Promise(function (resolve, reject) {
      cache = {};
      localStorage.clear();
      resolve();
    });
  },
  listenStorage(handler) {
    window.addEventListener('storage',handler)
  },
  unlistenStorage(handler) {
    window.removeEventListener('storage',handler);
  }
};