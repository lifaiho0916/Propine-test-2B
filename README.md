# Node.js CLI to extract portfolio value of tokens from CSV

## What to solve

Return the latest portfolio value per token in USD.

---

## Structure of CSV

* timestamp: Integer number of seconds since the Epoch
* transaction_type: Either a DEPOSIT or a WITHDRAWAL
* token: The token symbol
* amount: The amount transacted

| timestamp | transaction_type | token | amount |
|:---:|:---:|:---:|:---:|
| 1571967208 | DEPOSIT | BTC | 0.29866 |
| 1571967200 | DEPOSIT | ETH | 0.68364 |
| 1571967189 | WITHDRAWAL | XRP | 0.493839 |


---

## Dependencies

> **dotenv:** Loads environment variables from .env file.

> **yargs:** Helps build interactive command line tools, by parsing arguments and generating an elegant user interface.

> **fs:** Provides a lot of very useful functionality to access and interact with the file system.

> **papaparse:** Fast and powerful CSV parser for the browser that supports web workers and streaming large files. Converts CSV to JSON and JSON to CSV.

> **node-fetch:** A light-weight module that brings Fetch API to node.js.


---

## How to run the program

> Copy `.env.example` to `.env` and set CryptoExchange API Key.

> Copy the `transactions.csv` in the data folder.

> Use the `npm run start` command to run this program.

## Design decisions to solve this problem

### 1. Setting Environment variables

CRYPTOCOMPARE_API_KEY=`64 length hex string`
CRYPTOCOMPARE_URL=https://min-api.cryptocompare.com/data/price

These are used to convert one currency to another.

### 2. Parsing the contents of CSV

I have tried `csv-parser` and `papaparse` module to parse the contents of csv.

|    | Load Time (sec) | Downloads in past 1 Year |
|:---:|:---:|:---:|
| **csv-parser** | 70 | 740480 |
| **papaparse** | 45 | 1174560 |

### 3. Command Line Program

I have used `yargs` module to create command-line commands in node.js and makes this scalable. In the future, several command-line arguments can be added for more functionalities.

#### I have created:

* `portfolio` command
* Any other commands will be invalid as `strictCommands()`.

If we need any other commands or options in the future, we can add it later.