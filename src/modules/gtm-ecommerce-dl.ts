import { GtmEcommerceDlError } from '../_services'
import { User, Page, Ecommerce } from '../models'

export class GtmEcommerceDl {
  dataLayer = {
    event: '',
    user: '',
    page: ''
  }

  constructor () {
    let env: any
    let isCustomer: boolean
    this.dataLayer.event = 'sitewide'

    try {
      let envElem = document.querySelector('script[data-id="GtmEcommerceScript"]')
      if (envElem) {
        env = envElem.getAttribute('data-environment')
      }
      let isCustomerElem = document.querySelector('script[data-id="GtmEcommerceScript"]')
      if (isCustomerElem) {
        isCustomer = (isCustomerElem.getAttribute('data-customer') === 'true')
        this.dataLayer.user = new User(isCustomer).get()
      }

      if ([null, undefined, ''].includes(env)) {
        throw new GtmEcommerceDlError('\'data-environment\' was not provided to the script.')
      } else if (!['development', 'qa', 'staging', 'production'].includes(env)) {
        throw new GtmEcommerceDlError('\'data-environment\' has invalid value.')
      }

      this.dataLayer.page = new Page(env).get()

      console.log(this.dataLayer)
      if (window && !window.hasOwnProperty('dataLayer')) {
        throw new GtmEcommerceDlError('\'window.dataLayer\' is undefined, null, or blank. Ensure GTM is loaded and the datalayer exists.')
      } else {
        // @ts-ignore
        window.dataLayer.push(this.dataLayer)
      }
    } catch (e) {
      console.error(e)
      return
    }
  }

  ecommerce (event: any, data: any) {
    try {
      if (this.validateEvent(event)) {
        let ecom = new Ecommerce(data).get()
        // @ts-ignore
        window.dataLayer.push({ event: event, ecommerce: ecom })
      }
    } catch (e) {
      console.error(e)
    }
  }

  validateEvent (event: any) {
    const VALID_EVENTS = ['sitewide', 'purchase']
    if (!VALID_EVENTS.includes(event)) {
      throw new GtmEcommerceDlError(`event '${event}' is not a valid event type! `)
    }
    return true
  }
}
