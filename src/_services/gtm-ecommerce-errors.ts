export class GtmEcommerceError extends Error {
  constructor (msg: string) {
    super(msg)
    this.name = 'GtmEcommerceError'
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
