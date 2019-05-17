export class Page {
  data: any

  constructor (env: string) {
    this.data = {
      title: document.title,
      path: window.location.pathname,
      environment: env,
      subCategory: null
    }
  }
  get () {
    return this.data
  }
}
