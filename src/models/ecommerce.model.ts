import { GtmEcommerceError } from '../_services'

export class Ecommerce {
  data: any = []

  constructor (data: any) {
    if (this.verify(data)) {
      this.data = data
    }
  }

  verify (data: any) {
    if (!data) {
      throw new GtmEcommerceError('no data was privided!')
    }
    let nestedAttributeVerify: { [index: string]: any; } = {
      'purchase': {
        'actionField': (methodAttr: any, attributes: any) => {
          const ALLOWED_ATTRIBUTES = ['affiliation', 'coupon', 'couponDiscount', 'currencyCode', 'id']
          let attrAray = Object.keys(attributes)
          attrAray.forEach((i) => {
            if (!ALLOWED_ATTRIBUTES.includes(i)) {
              throw new GtmEcommerceError(`'${i}' is not a valid nested attribute for '${methodAttr}'!`)
            }
          })
          return true
        },
        'products': (methodAttr: any, products: any) => {
          const ALLOWED_ATTRIBUTES = ['brand', 'category', 'currency', 'dimension1', 'dimension2', 'dimension3', 'id', 'name', 'price', 'quantity', 'variant']
          products.forEach((product: any) => {
            let attrAray = Object.keys(product)
            attrAray.forEach((i) => {
              if (!ALLOWED_ATTRIBUTES.includes(i)) {
                throw new GtmEcommerceError(`'${i}' is not a valid nested attribute for '${methodAttr}'!`)
              }
            })
          })
          return true
        }
      }
    }

    let requestedActions = Object.keys(data)
    requestedActions.forEach((k) => {
      if (!nestedAttributeVerify[k]) {
        throw new GtmEcommerceError(`'${k}' is not a valid event key!`)
      }

      let requestedAttributes = Object.keys(data[k])
      requestedAttributes.forEach((i) => {
        if (typeof nestedAttributeVerify[k][i] !== 'function') {
          throw new GtmEcommerceError(`'${i}' is not a valid attribute for event key '${k}'`)
        }
        nestedAttributeVerify[k][i](i, data[k][i])
      })
    })

    return true
  }

  get () {
    return this.data
  }
}
