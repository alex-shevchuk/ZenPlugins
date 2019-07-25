export function convertAccount (json) {
  return {
    id: json.AcntContractId,
    type: 'card',
    title: json.CardName,
    instrument: json.CurrName,
    balance: parseFloat(json.Balance.replace(/,/g, '.')),
    creditLimit: 0,
    syncID: [json.Card4]
  }
}

export function convertTransaction (json) {
  let transaction = {
    date: new Date(json.TRANS_DATE),
    movements: [{
      id: json.DOC_ID.toString(),
      account: { id: json.CARD_ID.toString() },
      invoice: null,
      sum: (parseFloat(json.TRANS_AMOUNT) < 0 ? -1 : 1) * parseFloat(json.ACC_AMOUNT),
      fee: 0
    }],
    merchant: {
      mcc: null,
      location: null,
      fullTitle: json.TRANS_DETAILS
    },
    comment: json.TRANS_DETAILS,
    hold: null
  }
  if (json.TRANS_CURR !== json.ACC_CURR) {
    transaction.movements.invoice = {
      sum: parseFloat(json.TRANS_AMOUNT),
      instrument: json.TRANS_CURR
    }
  }

  return transaction
}
