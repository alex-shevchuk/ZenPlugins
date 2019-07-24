// import { flatMap } from 'lodash'
import * as network from '../../common/network'

const baseUrl = 'https://www.belveb24.by/'
var querystring = require('querystring')

export async function login (login, password) {
  let response = await network.fetch(baseUrl + 'login.php', {
    method: 'POST',
    stringify: querystring.stringify,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    followAllRedirects: true,
    body: { login: login, password: password }
  })

  console.log(response.headers)
  console.log(response)

  return ''
  // return (await fetchJson('auth.json', null, response => response.body.access_token)).body.access_token
}

export async function fetchAccounts () {
  let response = (await network.fetch(baseUrl + 'admin.php?xoadCall=true', {
    method: 'POST',
    body: 'a:4:{s:6:"source";s:77:"O:9:"connector":4:{s:6:"result";N;s:3:"lct";N;s:7:"message";N;s:5:"error";N;}";s:9:"className";s:9:"connector";s:6:"method";s:6:"xroute";s:9:"arguments";s:70:"a:2:{i:0;a:1:{s:11:"proxy.class";a:1:{s:11:"getAccounts";b:1;}}i:1;N;}";}' }))

  let accounts = JSON.parse(response.body.replace(',"xroute":function(){return xoad.call(this,"xroute",arguments)}', ''))
  accounts = accounts.returnObject.result.accounts.ACC
  if (accounts.length > 1) {
    return accounts
  }
  return [accounts]
}

export async function fetchTransactions (accounts) {
  const responses = await Promise.all(accounts.map(async account => {
    let response = await network.fetch(baseUrl + 'admin.php?xoadCall=true', {
      method: 'POST',
      body: 'a:4:{s:6:"source";s:77:"O:9:"connector":4:{s:6:"result";N;s:3:"lct";N;s:7:"message";N;s:5:"error";N;}";s:9:"className";s:9:"connector";s:6:"method";s:6:"xroute";s:9:"arguments";s:95:"a:2:{i:0;a:1:{s:11:"proxy.class";a:1:{s:17:"getAccountDetails";a:1:{s:2:"id";s:' + account.id + ':"0";}}}i:1;N;}";}'
    })
    let transactions = JSON.parse(response.body.replace(',"xroute":function(){return xoad.call(this,"xroute",arguments)}', ''))
    transactions = transactions.returnObject.result.accountDetails.F.Row
    return transactions
  }))
  console.log(responses)
  return responses
}
