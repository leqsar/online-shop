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

export {CATEGORYQUERY, PRODUCTQUERY}
