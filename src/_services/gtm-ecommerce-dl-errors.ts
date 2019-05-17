export class GtmEcommerceDlError extends Error {
  constructor (msg: string) {
    super(msg)
    this.name = 'GtmEcommerceDlError'
    this.message = msg
  }

  toJSON () {
    return {
      error: {
        name: this.name,
        message: this.message,
        stacktrace: this.stack
      }
    }
  }
}
