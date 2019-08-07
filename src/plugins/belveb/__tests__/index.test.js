import fetchMock from 'fetch-mock'
import { scrape } from '..'
import queryString from 'querystring'

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
    console.log(result)
    console.log(new Date('2019-07-05T00:00:00'))

    expect(result.accounts).toEqual([{
      id: '12345678',
      type: 'card',
      title: 'Mastercard World BYN',
      instrument: 'BYN',
      balance: 152.5,
      creditLimit: 0,
      syncID: ['5.5800']
    }, {
      id: '12345679',
      type: 'card',
      title: 'Mastercard BYN',
      instrument: 'BYN',
      balance: 10000,
      creditLimit: 0,
      syncID: ['5.5513']
    }])

    expect(result.transactions).toEqual([{
      date: '2019-07-31T00:00:00',
      movements: [{
        id: '1639123123',
        account: { id: '12345678' },
        invoice: null,
        sum: -48.95,
        fee: 0
      }],
      merchant: {
        mcc: null,
        location: null,
        fullTitle: 'Retail BLR MINSK.R-N AZS N 33 BAPB'
      },
      comment: '',
      hold: false
    }, {
      date: '2019-08-01T00:00:00',
      movements: [{
        id: '1639123456',
        account: { id: '12345678' },
        invoice: null,
        sum: -2.00,
        fee: 0
      }],
      merchant: {
        mcc: null,
        location: null,
        fullTitle: 'Retail BLR Minsk PTS 777 AVTOMOBILNYY P'
      },
      comment: '',
      hold: false
    }, {
      date: '2019-07-31T00:00:00',
      movements: [{
        id: '1639123456',
        account: { id: '12345678' },
        invoice: null,
        sum: -15.15,
        fee: 0
      }],
      merchant: {
        mcc: null,
        location: null,
        fullTitle: 'Retail BLR MINSK SHOP ZOOMARKET BPSBP'
      },
      comment: '',
      hold: false
    }, {
      date: '2019-07-28T00:00:00',
      movements: [{
        id: '1639123567',
        account: { id: '12345678' },
        invoice: null,
        sum: 200,
        fee: 0
      }],
      merchant: {
        mcc: null,
        location: null,
        fullTitle: 'CH Payment BLR IB SBS BVB PEREVOD SAME CARD'
      },
      comment: '',
      hold: false
    }, {
      date: '2019-07-27T00:00:00',
      movements: [{
        id: '1639123891',
        account: { id: '12345678' },
        invoice: null,
        sum: 150,
        fee: 0
      }],
      merchant: {
        mcc: null,
        location: null,
        fullTitle: 'CH Payment BLR MINSK KHUTKA NA KARTKU'
      },
      comment: '',
      hold: false
    }])
  })
})

function mockLoadAccounts () {
  /* eslint-disable */
  const accountJson = {
    "returnValue":null,
    "returnObject":{
      "result":{
        "cards":{
          "row":[
            {
              "AcntContractId":"12345678",
              "Expire":"1021",
              "Card8":"5456.5800",
              "RBS":"30141029650010226",
              "CurrCode":"933",
              "CurrName":"BYN",
              "iCardId":"488592",
              "isMain":"N",
              "EqClNum":[
              ],
              "IsDefault":[
              ],
              "UserComment":[
              ],
              "CardName":"Mastercard World BYN",
              "Card4":"5.5800",
              "Balance":"152,50",
              "IsDeposit":"Y",
              "IsCredit":"Y",
              "Is3D":"Y",
              "IsBelCard":"X",
              "IsSMS":"Y",
              "IsPush":"N",
              "CrdTInfo":"Mastercard World",
              "AvlOprs":[
              ],
              "PicPath":"MC_WORLD_DIVA"
            },
            {
              "AcntContractId":"12345679",
              "Expire":"0721",
              "Card8":"5445.5513",
              "RBS":"91121029653030226",
              "CurrCode":"933",
              "CurrName":"BYN",
              "iCardId":"569365",
              "isMain":"N",
              "EqClNum":[
              ],
              "IsDefault":[
              ],
              "UserComment":[
              ],
              "IsVirtual":"Y",
              "CardName":"Mastercard BYN",
              "Card4":"5.5513",
              "Balance":"10000,00",
              "IsDeposit":"Y",
              "IsCredit":"Y",
              "Is3D":"Y",
              "IsBelCard":"X",
              "IsSMS":"Y",
              "IsPush":"N",
              "CrdTInfo":"Mastercard",
              "AvlOprs":[
              ],
              "PicPath":"MASTERCARD_VIRT"
            }
          ],
          "CurrentActiveId":"0"
        }
      },
      "lct":null,
      "message":null,
      "error":null,
      "__meta":{
        "result":"a_array",
        "lct":"null",
        "message":"null",
        "error":"null"
      },
      "__size":4,
      "__class":"connector",
      "__url":"\\\\/belveb24\\\\/admin.php?xoadCall=true",
      "__uid":"b8f547fc1e95065539bdccf758487f7e",
      "__output":null,
      "__timeout":null,
      "xroute":function(){return xoad.call(this,
        "xroute",arguments)
      }
    }}
  /* eslint-enable */
  fetchMock.once({
    matcher: function (url, body) {
      return url === 'https://www.belveb24.by/admin.php?xoadCall=true' && queryString.stringify(body).indexOf('getCardsList') > -1
    },
    response: {
      status: 200,
      body: accountJson
    }
  })
}

function mockLoadTransactions () {
  /* eslint-disable */
  const transactionsJson = {
    "returnValue":null,
    "returnObject":{
      "result":{
        "pfmData":{
          "d4d4cdfc8a2158758b1b8e474b584321":{
            1639123123:{
              "TRANS_DATE":"2019-07-31T00:00:00",
              "TRANS_AMOUNT":"-48.95",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639123123,
              "TRANS_DETAILS":"Retail BLR MINSK.R-N AZS N 33 BAPB",
              "SIC_CODE":"5541",
              "ACC_AMOUNT":"48.95",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"02.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":12345678,
              "CLIENT_ID":6056596,
              "GROUP__ID":7.000000,
              "GROUP_NAME":"Авто и транспорт"
            },
            1639123456:{
              "TRANS_DATE":"2019-08-01T00:00:00",
              "TRANS_AMOUNT":"-2.00",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639123456,
              "TRANS_DETAILS":"Retail BLR Minsk PTS 777 AVTOMOBILNYY P",
              "SIC_CODE":"7523",
              "ACC_AMOUNT":"2.00",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"02.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":12345678,
              "CLIENT_ID":6056596,
              "GROUP__ID":7.000000,
              "GROUP_NAME":"Авто и транспорт"
            }
          },
          "4e92f018e8fd6c86d9face16c0306e2b":{
            1639123789:{
              "TRANS_DATE":"2019-07-31T00:00:00",
              "TRANS_AMOUNT":"-15.15",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639123789,
              "TRANS_DETAILS":"Retail BLR MINSK SHOP ZOOMARKET BPSB",
              "SIC_CODE":"5995",
              "ACC_AMOUNT":"15.15",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"02.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":12345678,
              "CLIENT_ID":6056596,
              "GROUP__ID":15.000000,
              "GROUP_NAME":"Домашние питомцы"
            }
          }
        },
        "pfmDataPlus":{
          "d8bec4b0df7fd717194c9711fc62ca1a":{
            1639123567:{
              "TRANS_DATE":"2019-07-28T00:00:00",
              "TRANS_AMOUNT":"200.00",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639123567,
              "TRANS_DETAILS":"CH Payment BLR IB SBS BVB PEREVOD SAME CARD",
              "SIC_CODE":"6028",
              "ACC_AMOUNT":"200.00",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"29.07.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":12345678,
              "CLIENT_ID":6056596,
              "GROUP__ID":20.000000,
              "GROUP_NAME":"Финансовые операции"
            },
            1639123891:{
              "TRANS_DATE":"2019-07-27T00:00:00",
              "TRANS_AMOUNT":"150.00",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639123891,
              "TRANS_DETAILS":"CH Payment BLR MINSK KHUTKA NA KARTKU",
              "SIC_CODE":"6012",
              "ACC_AMOUNT":"150.00",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"29.07.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":12345678,
              "CLIENT_ID":6056596,
              "GROUP__ID":20.000000,
              "GROUP_NAME":"Финансовые операции"
            }
          }
        },
        "groups":[
          {
            "gkey":"d4d4cdfc8a2158758b1b8e474b584321",
            "group":"Авто и транспорт",
            "ACC_CURR":"BYN",
            "amount":"1",
            "PERCENT":44.000000,
            "COLOR":"#FF6600"
          },
          {
            "gkey":"4e92f018e8fd6c86d9face16c0306e2b",
            "group":"Домашние питомцы",
            "ACC_CURR":"BYN",
            "amount":"1",
            "PERCENT":13.000000,
            "COLOR":"#FF9E01"
          },
          {
            "gkey":"d8bec4b0df7fd717194c9711fc62ca1a",
            "group":"Финансовые операции",
            "ACC_CURR":"BYN",
            "amount":"1",
            "PERCENT":2.000000,
            "COLOR":"#F9CE1D"
          }
        ],
        "groupsPlus":[
          {
            "gkey":"d8bec4b0df7fd717194c9711fc62ca1a",
            "group":"Финансовые операции",
            "ACC_CURR":"BYN",
            "amount":"16050.00",
            "PERCENT":100.000000,
            "COLOR":"#F9CE1D"
          }
        ],
        "sum":"116.80",
        "sumPlus":"0.00",
        "currency":"BYN"
      },
      "lct":null,
      "message":null,
      "error":null,
      "__meta":{
        "result":"a_array",
        "lct":"null",
        "message":"null",
        "error":"null"
      },
      "__size":4,
      "__class":"connector",
      "__url":"\/belveb24\/admin.php?xoadCall=true",
      "__uid":"f052cebca2bc0ba729ad7785c9a5f093",
      "__output":null,
      "__timeout":null,
      "xroute":function(){return xoad.call(this,
        "xroute",arguments)
      }
    }}
  /* eslint-enable */

  fetchMock.once({
    matcher: function (url, body) {
      return url === 'https://www.belveb24.by/admin.php?xoadCall=true' && queryString.stringify(body).indexOf('getPFMdata') > -1
    },
    response: {
      status: 200,
      body: transactionsJson
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
