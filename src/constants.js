const CATEGORYQUERY = `query {
  categories {
    name
    products {
      id,
      name,
      inStock,
      gallery,
      prices {
        currency,
        amount
      },
      description,
      attributes {
        name,
        items {
          value
        }
      }
    }
  }
}`;
const PRODUCTQUERY = `{
    id,
    name,
    brand,
    prices {
      currency,
      amount
    },
    description
    inStock,
    gallery,
    category,
    attributes {
      name,
      type,
      items {
        value
      }
    }
  }
`

const CORRESPONDINGCURRENCYSYMBOLS = [
  {
    name: 'USD',
    symbol: '$'
  },
  {
    name: 'GBP',
    symbol: '£'
  },
  {
    name: 'AUD',
    symbol: '$'
  },
  {
    name: 'JPY',
    symbol: '¥'
  },
  {
    name: 'RUB',
    symbol: '₽'
  },
]

export {CATEGORYQUERY, PRODUCTQUERY, CORRESPONDINGCURRENCYSYMBOLS}
