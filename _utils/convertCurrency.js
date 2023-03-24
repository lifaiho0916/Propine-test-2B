import fetch from 'node-fetch'

/**
 * Get the current price of any cryptocurrency in any other currency that you need.
 * To use CryptoCompare REST API, you need to set url and api_key in .env.
 * @param {*} _from The cryptocurrency symbol of interest
 * @param {*} _to The cryptocurrency symbol to convert into
 * @returns Current price
 */
const convertCurrency = async (_from, _to) => {
  try {
    /// prepare url
    let url = new URL(process.env.CRYPTOCOMPARE_URL)
    url.search = new URLSearchParams({
      fsym: _from,
      tsyms: _to,
      api_key: process.env.CRYPTOCOMPARE_API_KEY,
    }).toString()

    /// fetch and return price
    let response = await fetch(url)
    if (response.ok) {
      response = await response.json()
      if (response.Response == 'Error') {
        throw new Error(response.Message)
      }
      return response[_to]
    }
  } catch (err) {
    console.log('Convert Currency Error:', err.message)
  }
}

export default convertCurrency