import * as bank from './belveb'
import * as converters from './converters'

export async function scrape ({ preferences, fromDate, toDate }) {
  await bank.login(preferences.login, preferences.password)
  const accounts = (await bank.fetchAccounts()).map(converters.convertAccount)
  const transactions = (await bank.fetchTransactions(accounts, fromDate, toDate))
    .map(transaction => converters.convertTransaction(transaction))
  return {
    accounts: accounts,
    transactions: transactions
  }
}
