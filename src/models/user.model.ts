import { GtmEcommerceUserError } from '../_services'

export class User {
  data: any
  constructor (isCustomer: boolean) {
    this.data = {
      id: this.getGuestToken(),
      customer: isCustomer,
      loggedIn: false,
      infinitiId: this.getInfinityId(),
      sessionId: this.getSessionId()
    }
  }

  getCookie (name: any) {
    {
      let re = new RegExp(name + '=([^;]+)')
      let value = re.exec(document.cookie)
      return (value !== null) ? unescape(value[1]) : null
    }
  }

  getInfinityId () {
    let cookieValue = this.getCookie('ictf_master')
    if (cookieValue) {
      return cookieValue
    } else {
      throw new GtmEcommerceUserError('\'ictf_master"\' cookie was not existent (undefined, null, or blank)')
    }
  }

  getSessionId () {
    let cookieValue = this.getCookie('_livewatch-store_session') || this.getCookie('_livewatch-ecommerce_session')
    if (cookieValue) {
      return cookieValue
    } else {
      throw new GtmEcommerceUserError('\'_livewatch-store_session\' or \'_livewatch-ecommerce_session\' cookie(s) was not existent (undefined, null, or blank)')
    }
  }

  getGuestToken () {
    let cookieValue = this.getCookie('guest_token')
    if (cookieValue) {
      return cookieValue
    } else {
      throw new GtmEcommerceUserError('\'guest_token\' cookie was not existent (undefined, null, or blank)')
    }
  }

  get () {
    return this.data
  }
}
