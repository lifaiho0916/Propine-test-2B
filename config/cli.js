import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { COMMAND } from '../_constants/index.js'

const argv = yargs(hideBin(process.argv))
  .usage('node $0 <command> [options]')
  .command('portfolio', 'List the portfolio of the token', yargs => {
    return yargs
      .option({})
      .strictOptions()
      .check((arg, options) => {
        arg.command = arg._[0]
        return true
      })
  })
  .strictCommands()
  .check((arg, options) => {
    if (!(arg._[0] in COMMAND)) {
      throw new Error('Enter valid command')
    }
    return true
  })
  .help()
  .argv

export default argv