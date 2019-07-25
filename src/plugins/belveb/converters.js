export function convertAccount (json) {
  const account = {
    id: json.AcntContractId,
    type: 'card',
    title: json.CardName,
    instrument: json.CurrName,
    balance: parseFloat(json.Balance.replace(/,/g, '.')),
    creditLimit: 0,
    syncID: [json.iCardId]
  }
  if (!account.title) {
    account.title = '*' + account.syncID[0]
  }
  return account
}

export function convertTransaction (json) {
  const transaction = {
    date: new Date(json.TRANS_DATE),
    movements: [{
      id: json.DOC_ID.toString(),
      account: { id: json.CARD_ID.toString() },
      invoice: null,
      sum: parseFloat(json.ACC_AMOUNT),
      fee: 0
    }],
    merchant: null,
    comment: json.TRANS_DETAILS,
    hold: null
  }

  return transaction
}
