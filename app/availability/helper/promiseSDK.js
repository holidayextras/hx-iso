const _ = {
  assign: require('lodash/assign')
}

const HapiSDK = require('hapi-sdk')

const TOKEN = 'INSERT_TOKEN_HERE'

export function availabilitySearch(props) {
  const sdk = new HapiSDK(TOKEN)

  return new Promise((resolve, reject) => {
    sdk.product.availabilitySearch(_.assign(props, {
      productType: 'carparks'
    }), (err, result) => {
      if(err) return reject(err)

      resolve(result)
    })
  })
}
