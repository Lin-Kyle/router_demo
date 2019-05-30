export default class HashHistory {
  constructor(router, options) {
    this.router = router
    this.onComplete = null
    // 监听事件
    window.addEventListener('load', this.onChange)
    window.addEventListener('hashchange', this.onChange)
  }

  onChange = () => {
    // 匹配失败重定向
    if (!location.hash || !this.router._cache[location.hash.slice(1)]) {
      window.location.hash = this.router._defaultRouter
    } else {
      // 渲染视图
      this.router._wrapper.innerHTML = this.router._cache[location.hash.slice(1)]
      this.onComplete && this.onComplete() && (this.onComplete = null)
    }
  }

  push(url, onComplete) {
    window.location.hash = `${url}`
    onComplete && (this.onComplete = onComplete)
  }

  replace(url, onComplete) {
    // 优雅降级
    if (this.router._supportsReplaceState) {
      window.location.hash = `${url}`
      window.history.replaceState(null, null, `${window.location.origin}#${url}`)
    } else {
      // 需要先看看当前URL是否已经有hash值
      const href = location.href
      const index = href.indexOf('#')
      url = index > 0
        ? `${href.slice(0, index)}#${url}`
        : `${href}#${url}`
      // 域名不变的情况下不会刷新页面
      window.location.replace(url)
    }

    onComplete && (this.onComplete = onComplete)
  }

  // 移除事件
  stop() {
    window.removeEventListener('load', this.onChange)
    window.removeEventListener('hashchange', this.onChange)
  }
}