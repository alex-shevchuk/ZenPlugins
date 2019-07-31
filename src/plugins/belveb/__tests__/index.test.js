import fetchMock from 'fetch-mock'
import _ from 'lodash'
import { scrape } from '..'
import queryString from 'querystring'

const accountContractId = '12345678'

describe('scrape', () => {
  it('should hit the mocks and return results', async () => {
    mockIdentity()
    mockLoadAccounts()
    mockLoadTransactions()

    const result = await scrape(
      {
        preferences: { login: '123456789', password: 'pass' },
        fromDate: new Date('2019-05-01T00:00:00.000+03:00'),
        toDate: new Date('2019-05-09T00:00:00.000+03:00')
      }
    )

    console.log(result.accounts)
    console.log(result.transactions)

    // expect(result.accounts).toEqual([{
    //   'balance': 999.9,
    //   'creditLimit': 0,
    //   'id': '1111111',
    //   'instrument': 'BYN',
    //   'productType': 'PC',
    //   'syncID': ['BY36MTBK10110001000001111000', 'BY36MTBK10110001000001111000M', '1111'],
    //   'title': 'PayOkay',
    //   'type': 'card'
    // }])
    //
    // expect(result.transactions).toEqual([{
    //   hold: false,
    //   date: new Date('2018-12-28T00:00:00+03:00'),
    //   movements: [{
    //     id: '1111111',
    //     account: { id: '1111111' },
    //     sum: -12.39,
    //     fee: 0,
    //     invoice: {
    //       sum: -5,
    //       instrument: 'EUR'
    //     }
    //   }],
    //   merchant: {
    //     fullTitle: 'PAYPAL',
    //     location: null,
    //     mcc: null
    //   },
    //   comment: null
    // }, {
    //   hold: false,
    //   date: new Date('2018-12-29T01:07:39+03:00'),
    //   movements: [{
    //     id: '1111112',
    //     account: { id: '1111111' },
    //     sum: -29.68,
    //     fee: 0,
    //     invoice: null
    //   }],
    //   merchant: {
    //     fullTitle: 'Магазин',
    //     location: null,
    //     mcc: null
    //   },
    //   comment: null
    // }])
  })
})

function mockLoadAccounts () {
  fetchMock.once({
    matcher: (url, { body }) => url === 'https://www.belveb24.by/admin.php?xoadCall=true' && _.isEqual(body, queryString.stringify({
      method: 'POST',
      body: 'a:4:{s:6:"source";s:77:"O:9:"connector":4:{s:6:"result";N;s:3:"lct";N;s:7:"message";N;s:5:"error";N;}";s:9:"className";s:9:"connector";s:6:"method";s:6:"xroute";s:9:"arguments";s:65:"a:1:{i:0;a:1:{s:11:"proxy.class";a:1:{s:12:"getCardsList";b:1;}}}";}'
    })),
    response: {
      status: 200,
      body: '{"returnValue":null,"returnObject":{"result":{"cards":{"row":[{"AcntContractId":"' + accountContractId + '","Expire":"1021","Card8":"5456.5800","RBS":"30141029650010226","CurrCode":"933","CurrName":"BYN","iCardId":"488592","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"CardName":"Mastercard World BYN","Card4":"5.5800","Balance":"152,50","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard World","AvlOprs":[],"PicPath":"MC_WORLD_DIVA"},{"AcntContractId":"17543019","Expire":"0721","Card8":"5445.5513","RBS":"91121029653030226","CurrCode":"933","CurrName":"BYN","iCardId":"569365","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"IsVirtual":"Y","CardName":"Mastercard BYN","Card4":"5.5513","Balance":"10000,00","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard","AvlOprs":[],"PicPath":"MASTERCARD_VIRT"}],"CurrentActiveId":"0"}},"lct":null,"message":null,"error":null,"__meta":{"result":"a_array","lct":"null","message":"null","error":"null"},"__size":4,"__class":"connector","__url":"\\\\/belveb24\\\\/admin.php?xoadCall=true","__uid":"b8f547fc1e95065539bdccf758487f7e","__output":null,"__timeout":null,"xroute":function(){return xoad.call(this,"xroute",arguments)}}}'
    }
  })
}

function mockLoadTransactions () {
  fetchMock.once({
    matcher: (url, { body }) => url === 'https://www.belveb24.by/admin.php?xoadCall=true' && _.isEqual(body, queryString.stringify({
      method: 'POST',
      body: 'a:4:{s:6:"source";s:77:"O:9:"connector":4:{s:6:"result";N;s:3:"lct";N;s:7:"message";N;s:5:"error";N;}";s:9:"className";s:9:"connector";s:6:"method";s:6:"xroute";s:9:"arguments";s:' + (226 + accountContractId.length) + ':"a:2:{i:0;a:1:{s:11:"proxy.class";a:1:{s:10:"getPFMdata";a:6:{s:5:"range";N;s:4:"mode";s:5:"cards";s:5:"cards";a:1:{i:0;s:' + accountContractId + ':"' + accountContractId + '";}s:8:"currency";s:3:"BYN";s:8:"dateFrom";s:10:"01.05.2019";s:6:"dateTo";s:10:"09.05.2019";}}}i:1;N;}";}'
    })),
    response: {
      status: 200,
      body: '{"returnValue":null,"returnObject":{"result":{"cards":{"row":[{"AcntContractId":"15727308","Expire":"1021","Card8":"5456.5800","RBS":"30141029650010226","CurrCode":"933","CurrName":"BYN","iCardId":"488592","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"CardName":"Mastercard World BYN","Card4":"5.5800","Balance":"152,50","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard World","AvlOprs":[],"PicPath":"MC_WORLD_DIVA"},{"AcntContractId":"17543019","Expire":"0721","Card8":"5445.5513","RBS":"91121029653030226","CurrCode":"933","CurrName":"BYN","iCardId":"569365","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"IsVirtual":"Y","CardName":"Mastercard BYN","Card4":"5.5513","Balance":"10000,00","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard","AvlOprs":[],"PicPath":"MASTERCARD_VIRT"}],"CurrentActiveId":"0"}},"lct":null,"message":null,"error":null,"__meta":{"result":"a_array","lct":"null","message":"null","error":"null"},"__size":4,"__class":"connector","__url":"\\/belveb24\\/admin.php?xoadCall=true","__uid":"b8f547fc1e95065539bdccf758487f7e","__output":null,"__timeout":null,"xroute":function(){return xoad.call(this,"xroute",arguments)}}}'
    }
  })
}

function mockIdentity () {
  fetchMock.once({
    matcher: (url) => url === 'https://www.belveb24.by/login.php',
    response: {
      status: 200,
      body: JSON.stringify({
        'ResponseType': 'ResponseOfUserIdentityByPhoneData',
        'error': null,
        'sessionId': null,
        'success': true,
        'validateErrors': null,
        'data': {
          'smsCode': null,
          'userLinkedAbs': true
        }
      })
    }
  })
}
