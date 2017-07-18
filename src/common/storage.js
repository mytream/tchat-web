/**
 * Created by sunshine on 2016/10/9.
 */
var cache = {};

export default {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  },
  get(key) {
    let value = localStorage.getItem(key);
    value = JSON.parse(value);
    return value;
  },
  remove(...keys) {
    keys.forEach((key) => {
      localStorage.removeItem(key);
    });
  },
  clear() {
    localStorage.clear();
  }
};