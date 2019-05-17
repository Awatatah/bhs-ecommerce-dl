export class GtmEcommerceUserError extends Error {
  constructor (msg: string) {
    super(msg)
    this.name = 'GtmEcommerceUserError'
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
