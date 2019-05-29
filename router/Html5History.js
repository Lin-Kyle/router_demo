export default class Html5Hstory {
  constructor(options) {
    this._stop = false;
    this._wrapper = options.wrapper
    this._cache = options.cache
    this._viewChange = this.viewChange.bind(this)
    window.addEventListener('popstate', this._viewChange)
    window.addEventListener('load', () => {
      if (location.pathname === '/') {
        history.pushState(null, '', options.defaultRouter);
      }
      this._viewChange()
    })
  }

  viewChange() {
    this._wrapper.innerHTML = this._cache[location.pathname]
  }

  go(url) {
    if (this._stop) return
    history.pushState(null, '', url);
    this._viewChange()
  }

  back() {
    history.go(-1)
  }

  redirect(url, content) {
    if (this._stop) return
    history.replaceState(null, '', url)
    this._viewChange()
  }

  stop() {
    this._stop = true
    window.removeEventListener('load', this._viewChange)
    window.removeEventListener('popstate', this._viewChange)
  }
}