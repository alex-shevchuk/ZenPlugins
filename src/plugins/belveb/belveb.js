import moment from 'moment'
import _ from 'lodash'
import dirtyJson from 'dirty-json'
import * as network from '../../common/network'
import queryString from 'querystring'

const baseUrl = 'https://www.belveb24.by/'

async function fetchJson (queryString, queryStr = '') {
  let response = (await network.fetch(baseUrl + 'admin.php?xoadCall=true' + queryStr, {
    method: 'POST',
    body: queryString
  }))

  return dirtyJson.parse(response.body.replace(',"xroute":function(){return xoad.call(this,"xroute",arguments)}', ''))
}

export async function login (login, password) {
  await network.fetch(baseUrl + 'login.php', {
    method: 'POST',
    stringify: queryString.stringify,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    followAllRedirects: true,
    body: { login: login, password: password }
  })
}

export async function fetchAccounts () {
  // It's possible to fetch only cards
  let cards = await fetchJson('a:4:{s:6:"source";s:77:"O:9:"connector":4:{s:6:"result";N;s:3:"lct";N;s:7:"message";N;s:5:"error";N;}";s:9:"className";s:9:"connector";s:6:"method";s:6:"xroute";s:9:"arguments";s:65:"a:1:{i:0;a:1:{s:11:"proxy.class";a:1:{s:12:"getCardsList";b:1;}}}";}')

  // let body = '{"returnValue":null,"returnObject":{"result":{"cards":{"row":[{"AcntContractId":"15727308","Expire":"1021","Card8":"5456.5800","RBS":"30141029650010226","CurrCode":"933","CurrName":"BYN","iCardId":"488592","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"CardName":"Mastercard World BYN","Card4":"5.5800","Balance":"152,50","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard World","AvlOprs":[],"PicPath":"MC_WORLD_DIVA"},{"AcntContractId":"17543019","Expire":"0721","Card8":"5445.5513","RBS":"91121029653030226","CurrCode":"933","CurrName":"BYN","iCardId":"569365","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"IsVirtual":"Y","CardName":"Mastercard BYN","Card4":"5.5513","Balance":"10000,00","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard","AvlOprs":[],"PicPath":"MASTERCARD_VIRT"}],"CurrentActiveId":"0"}},"lct":null,"message":null,"error":null,"__meta":{"result":"a_array","lct":"null","message":"null","error":"null"},"__size":4,"__class":"connector","__url":"\\/belveb24\\/admin.php?xoadCall=true","__uid":"b8f547fc1e95065539bdccf758487f7e","__output":null,"__timeout":null,"xroute":function(){return xoad.call(this,"xroute",arguments)}}}'

  return cards.returnObject.result.cards.row
}

export async function fetchTransactions (accounts, dateFrom, dateTo = null) {
  const accountsFilter = _.flatMap(accounts, (el, index) => {
    return `i:${index};s:${el.id.length}:"${el.id}"`
  })

  let dateFromFromatted = moment(dateFrom, 'YYYY-MM-DD').format('DD.MM.YYYY')
  let dateToFromatted = !dateTo ? moment().format('DD.MM.YYYY') : moment(dateTo, 'YYYY-MM-DD').format('DD.MM.YYYY')

  let filter = '"a:2:{i:0;a:1:{s:11:"proxy.class";a:1:{s:10:"getPFMdata";a:6:{s:5:"range";N;s:4:"mode";s:5:"cards";s:5:"cards";a:' + accounts.length + ':{' + accountsFilter.join(';') + ';}s:8:"currency";s:3:"BYN";s:8:"dateFrom";s:10:"' + dateFromFromatted + '";s:6:"dateTo";s:10:"' + dateToFromatted + '";}}}i:1;N;}"'

  let transactions = await fetchJson('a:4:{s:6:"source";s:77:"O:9:"connector":4:{s:6:"result";N;s:3:"lct";N;s:7:"message";N;s:5:"error";N;}";s:9:"className";s:9:"connector";s:6:"method";s:6:"xroute";s:9:"arguments";s:' + (filter.length - 2) + ':' + filter + ';}')

  let outcome = transactions.returnObject.result.pfmData
  let income = transactions.returnObject.result.pfmDataPlus
  let outcomeOps = []
  let incomeOps = []
  _.forEach(income, function (incomeGroup) {
    _.forEach(incomeGroup, function (incomeTransaction) {
      incomeOps.push(incomeTransaction)
    })
  })
  _.forEach(outcome, function (outcomeGroup) {
    _.forEach(outcomeGroup, function (outcomeTransaction) {
      outcomeOps.push(outcomeTransaction)
    })
  })
  console.log(_.union(outcomeOps, incomeOps))
  return _.union(outcomeOps, incomeOps)
}
