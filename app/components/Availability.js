const React = require('react')
const HapiSDK = require('hapi-sdk')
const { Tile } = require('@holidayextras/ui-toolkit')
const _ = {
  assign: require('lodash/assign'),
  omit: require('lodash/omit')
}

const TOKEN = 'ef008a98-9434-11e1-af41-123143040224'

class Availability extends React.Component {
  static fetchData(props) {
    return new Promise((resolve, reject) => {
      const sdk = new HapiSDK(TOKEN)

      sdk.product.availabilitySearch(_.assign(props, {
        productType: 'carparks'
      }), (err, result) => {
        if(err) return reject(err)
        resolve(result.products.map(product => product.data))
      })
    })
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      products: context.preFetchedData.Availability,
      productsLoaded: !!context.preFetchedData.Availability
    }
  }

  componentDidMount() {
    if(!this.state.productsLoaded) {
      this.loadData()
    }
  }

  componentWillReceiveProps() {
    this.loadData()
  }

  loadData() {
    const { to, from, location } = this.props.location.query
    Availability.fetchData({
      to,
      from,
      location
    }).done(( products ) => {
      this.setState({
        products,
        productsLoaded: true
      })
    }, (err) => {
      console.error(err)
    })
  }

  render() {
    if(!this.state.productsLoaded) {
      return <div>
        <p>Loading...</p>
      </div>
    }

    return <div>
      {this.state.products.filter( product => {
        if(!product.images) return false
        if(product.images.length === 0 ) return false
        return true;
      }).map( product => {
        return <Tile image={product.images[0]} key={product.code}>
          <h2>{product.name}</h2>
        </Tile>
      })}
    </div>
  }
}

Availability.contextTypes = {
  preFetchedData: React.PropTypes.object
}

module.exports = Availability
