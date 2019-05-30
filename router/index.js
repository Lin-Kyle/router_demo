import HashHstory from "./HashHistory";
import Html5History from "./Html5History";

export default class Router {
  constructor(wrapper, options, mode = 'hash') {
    this._wrapper = document.querySelector(`#${wrapper}`)
    if (!this._wrapper) {
      throw new Error(`你需要提供一个容器元素插入`)
    }
    // 是否支持HTML5 History 模式
    this._supportsReplaceState = window.history && typeof window.history.replaceState === 'function'
    // 匹配路径
    this._cache = {}
    // 默认路由
    this._defaultRouter = options.routes[0].path
    this.route(options.routes)
    // 启用模式
    this._history = (mode !== 'hash' && this._supportsReplaceState) ? new Html5History(this, options) : new HashHstory(this, options)
  }

  // 添加路由
  route(routes) {
    routes.forEach(item => this._cache[item.path] = item.component)
  }

  // 原生浏览器前进
  go(n = 1) {
    window.history.go(n)
  }

  // 原生浏览器后退
  back(n = -1) {
    window.history.go(n)
  }

  // 增加
  push(url, onComplete) {
    this._history.push(url, onComplete)
  }

  // 替换
  replace(url, onComplete) {
    this._history.replace(url, onComplete)
  }

  // 移除事件
  stop() {
    this._history.stop()
  }
}