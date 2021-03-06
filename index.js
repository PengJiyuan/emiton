/*!
 * emitry
 * https://github.com/PengJiyuan/emitry
 *
 * Copyright (c) 2018 PengJiyuan
 * Licensed under the MIT license.
 */

class Emitry {

  constructor() {
    this.list = Object.create(null);
  }

  has(key) {
    return ~Object.keys(this.list).indexOf(key);
  }

  isArray(array) {
    return Object.prototype.toString.call(array) === '[object Array]';
  }

  emit(name, ...data) {
    if (this.list[name]) {
      for (let i = 0; i < this.list[name].length; i++) {
        const e = this.list[name][i];
        e.callback(...data);
        if(e.once) {
          this.list[name].splice(i--, 1);
        }
      }
      if(this.list[name] && this.list[name].length === 0) {
        delete this.list[name];
      }
    }
  }

  on(name, callback) {
    if(!this.has(name)) {
      this.list[name] = [];
    }
    this.list[name].push({
      callback
    });
  }

  once(name, callback) {
    if(!this.has(name)) {
      this.list[name] = [];
    }
    this.list[name].push({
      once: true,
      callback
    });
  }

  off(names, callback) {
    if(this.isArray(names)) {
      names.forEach(name => delete this.list[name]);
    } else if(typeof names === 'string' && typeof callback === 'function') {
      if (this.has(names)) {
        let removedOne = this.list[names].findIndex(item => item.callback === callback);
        ~removedOne && this.list[names].splice(removedOne, 1);
      }
    } else {
      this.list = Object.create(null);
    }
  }

}

export default Emitry;
