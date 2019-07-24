export function convertAccount (json) {
  console.log(json)
  const account = {
    id: json['@attributes'].id,
    type: 'card',
    title: json['@attributes'].IBAN,
    instrument: json['@attributes'].Curr,
    balance: parseFloat(json['@attributes'].Amount.replace(/,/g, '.')),
    creditLimit: 0,
    syncID: [json['@attributes'].Number]
  }
  if (!account.title) {
    account.title = '*' + account.syncID[0]
  }
  return account
}

export function convertTransaction (json) {
  console.log(json)
  const transaction = {
    hold: json.type !== 'TRANSACTION',
    income: json.accountAmount.value > 0 ? json.accountAmount.value : 0,
    incomeAccount: json.relationId,
    outcome: json.accountAmount.value < 0 ? -json.accountAmount.value : 0,
    outcomeAccount: json.relationId,
    date: new Date(json.operationTime)
  }
  if (!transaction.hold) {
    transaction.id = json.id
  }
  if (json.accountAmount.currency.shortName !== json.amount.currency.shortName) {
    if (json.amount.value > 0) {
      transaction.opIncome = json.amount.value
      transaction.opIncomeInstrument = json.amount.currency.shortName
    } else {
      transaction.opOutcome = -json.amount.value
      transaction.opOutcomeInstrument = json.amount.currency.shortName
    }
  }
  return transaction
}
