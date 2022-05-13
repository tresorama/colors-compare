export default class SimpleBrowserStorage {
  constructor(key) {
    this.storage_key = key;
    this.storage = window.localStorage;
  }
  get() {
    return this.unserialize(this.storage.getItem(this.storage_key));
  }
  set(value) {
    this.storage.setItem(this.storage_key, this.serialize(value));
  }
  remove() {
    this.storage.removeItem(this.storage_key);
  }
  serialize(thing) {
    return JSON.stringify(thing);
  }
  unserialize(thing) {
    return JSON.parse(thing);
  }
}