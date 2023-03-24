import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

import { argv } from './config/index.js'
import { extractPortfolio } from './_services/index.js'
import { csvDirName, csvFileName } from './_constants/index.js'

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

switch (argv.command) {
  case 'portfolio':
    let csvDirPath = __dirname + '/' + csvDirName
    extractPortfolio(csvDirPath, csvFileName)
    break

  default:
    console.error(`${argv.command} is not a valid command`)
}
