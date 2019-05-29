import HashHstory from "./HashHistory";
import Html5History from "./Html5History";

export default class Router {
  constructor(wrapper, options, mode = 'hash') {
    this._wrapper = document.querySelector(`#${wrapper}`)
    if (!this._wrapper) {
      throw new Error(`你需要提供一个容器元素插入`)
    }
    this._cache = {}
    this._defaultRouter = options.routes[0].path
    this.route(options.routes)
    this._history = mode === 'hash' ? new HashHstory(this, options) : new Html5History({ wrapper: this.wrapper, cache: this.cache, defaultRouter: this.defaultRouter })
  }

  route(routes) {
    routes.forEach(item => this._cache[item.path] = item.component)
  }

  go(url, content) {
    this._history.go(url, content)
  }

  back() {
    this._history.back()
  }


  redirect(url, content) {
    this._history.redirect(url, content)
  }

  stop() {
    this._history.stop()
  }
}