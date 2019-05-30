export default class Html5Hstory {
  constructor(router, options) {
    this.addEvent()
    this.router = router
    this.onComplete = null
    // 监听事件
    window.addEventListener('popstate', this.onChange)
    window.addEventListener('load', this.onChange)
    window.addEventListener('replaceState', this.onChange);
    window.addEventListener('pushState', this.onChange);
  }

  // pushState/replaceState不会触发popstate事件,所以我们需要自定义
  addEvent() {
    const listenWrapper = function (type) {
      const _func = history[type];
      return function () {
        const func = _func.apply(this, arguments);
        const e = new Event(type);
        e.arguments = arguments;
        window.dispatchEvent(e);
        return func;
      };
    };
    history.pushState = listenWrapper('pushState');
    history.replaceState = listenWrapper('replaceState');
  }

  onChange() {
    // 匹配失败重定向
    if (location.pathname === '/' || !this.router._cache[location.pathname]) {
      window.history.pushState(null, '', `${window.location.origin}${this.router._defaultRouter}`);
    } else {
      // 渲染视图
      this.router._wrapper.innerHTML = this.router._cache[location.pathname]
      this.onComplete && this.onComplete() && (this.onComplete = null)
    }
  }

  push(url, onComplete) {
    window.history.pushState(null, '', `${window.location.origin}${url}`);
    onComplete && (this.onComplete = onComplete)
  }

  replace(url, onComplete) {
    window.history.replaceState(null, null, `${window.location.origin}${url}`)
    onComplete && (this.onComplete = onComplete)
  }

  // 移除事件
  stop() {
    window.removeEventListener('load', this.onChange)
    window.removeEventListener('popstate', this.onChange)
    window.removeEventListener('replaceState', this.onChange)
    window.removeEventListener('pushState', this.onChange)
  }
}