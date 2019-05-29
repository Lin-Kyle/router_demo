export default class HashHistory {
  constructor(router, options) {
    this.router = router
    this.viewChange = this.viewChange.bind(this)
    window.addEventListener('load', () => {
      if (!location.hash || !this.router._cache[location.hash.slice(1)]) {
        location.hash = this.router._defaultRouter
      } else {
        this.viewChange()
      }
    })
    window.addEventListener('hashchange', this.viewChange)
  }

  viewChange() {
    this.router._wrapper.innerHTML = this.router._cache[location.hash.slice(1)]
  }

  go(url) {
    location.hash = `${url}`
  }

  back() {
    history.go(-1)
  }

  redirect(url, content) {
    // 需要先看看当前URL是否已经有hash值
    const href = location.href
    const index = href.indexOf('#')
    url = index > 0
      ? `${href.slice(0, index)}#${url}`
      : `${href}#${url}`
    location.replace(url)
  }

  stop() {
    window.removeEventListener('load', this.viewChange)
    window.removeEventListener('hashchange', this.viewChange)
  }
}