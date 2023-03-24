import fs from 'fs'
import papa from 'papaparse'

import { convertCurrency } from '../_utils/index.js'

const extractPortfolio = (csvDir, csvFileName, loading) => {
  const csvFilePath = `${csvDir}/${csvFileName}`
  let portfolioValue = {}
  
  console.time('Load transactions')

  let file = fs.createReadStream(csvFilePath);
  papa.parse(file, {
    header: true,
    step: results => {
      /// add portfolio value if token and date meet the condition
      let data = results.data
      if ( portfolioValue[data.token] === undefined ) {
        let amount = Number(data.amount)
        portfolioValue[data.token] = (portfolioValue[data.token] | 0) + (data.transaction_type == 'DEPOSIT' ? amount : -amount)
      }
    },
    complete: async () => {
      clearTimeout(loading)
      console.timeEnd('Load transactions')
      console.log()

      console.log('Latest Porfolio Value: ', portfolioValue);
      console.log('Converting to USD...');
      if (Object.keys(portfolioValue).length !== 0) {
        for (let token in portfolioValue){
          portfolioValue[token] *= (await convertCurrency(token, 'USD'))
        }
        
        /// show result
        console.log('Portfolio value in USD')
        console.log(portfolioValue)
      }
    },
    error: err => { console.log(err) }
  });
}

export default extractPortfolio