import fetchMock from 'fetch-mock'
import { scrape } from '..'
import queryString from 'querystring'

const accountContractId1 = '12345678'
const accountContractId2 = '12345679'

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
    matcher: function (url, body) {
      return url === 'https://www.belveb24.by/admin.php?xoadCall=true' && queryString.stringify(body).indexOf('getCardsList') > -1
    },
    response: {
      status: 200,
      body: '{"returnValue":null,"returnObject":{"result":{"cards":{"row":[{"AcntContractId":"' + accountContractId1 + '","Expire":"1021","Card8":"5456.5800","RBS":"30141029650010226","CurrCode":"933","CurrName":"BYN","iCardId":"488592","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"CardName":"Mastercard World BYN","Card4":"5.5800","Balance":"152,50","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard World","AvlOprs":[],"PicPath":"MC_WORLD_DIVA"},{"AcntContractId":"' + accountContractId2 + '","Expire":"0721","Card8":"5445.5513","RBS":"91121029653030226","CurrCode":"933","CurrName":"BYN","iCardId":"569365","isMain":"N","EqClNum":[],"IsDefault":[],"UserComment":[],"IsVirtual":"Y","CardName":"Mastercard BYN","Card4":"5.5513","Balance":"10000,00","IsDeposit":"Y","IsCredit":"Y","Is3D":"Y","IsBelCard":"X","IsSMS":"Y","IsPush":"N","CrdTInfo":"Mastercard","AvlOprs":[],"PicPath":"MASTERCARD_VIRT"}],"CurrentActiveId":"0"}},"lct":null,"message":null,"error":null,"__meta":{"result":"a_array","lct":"null","message":"null","error":"null"},"__size":4,"__class":"connector","__url":"\\\\/belveb24\\\\/admin.php?xoadCall=true","__uid":"b8f547fc1e95065539bdccf758487f7e","__output":null,"__timeout":null,"xroute":function(){return xoad.call(this,"xroute",arguments)}}}'
    }
  })
}

function mockLoadTransactions () {
  /* eslint-disable */
  let transactionsTest = '{
    "returnValue":null,
    "returnObject":{
      "result":{
        "pfmData":{
          "d4d4cdfc8a2158758b1b8e474b584321":{
            1639374640:{
              "TRANS_DATE":"2019-07-31T00:00:00",
              "TRANS_AMOUNT":"-48.95",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639374640,
              "TRANS_DETAILS":"Retail BLR MINSK.R-N AZS N 33 BAPB",
              "SIC_CODE":"5541",
              "ACC_AMOUNT":"48.95",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"02.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":15727308,
              "CLIENT_ID":6056596,
              "GROUP__ID":7.000000,
              "GROUP_NAME":"Авто и транспорт"
            },
            1639507829:{
              "TRANS_DATE":"2019-08-01T00:00:00",
              "TRANS_AMOUNT":"-2.00",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639507829,
              "TRANS_DETAILS":"Retail BLR Minsk PTS 777 AVTOMOBILNYY P",
              "SIC_CODE":"7523",
              "ACC_AMOUNT":"2.00",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"02.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":15727308,
              "CLIENT_ID":6056596,
              "GROUP__ID":7.000000,
              "GROUP_NAME":"Авто и транспорт"
            }
          },
          "4e92f018e8fd6c86d9face16c0306e2b":{
            1639383770:{
              "TRANS_DATE":"2019-07-31T00:00:00",
              "TRANS_AMOUNT":"-15.15",
              "TRANS_CURR":"BYN",
              "DOC_ID":1639383770,
              "TRANS_DETAILS":"Retail BLR MINSK SHOP ZOOMARKET BPSB",
              "SIC_CODE":"5995",
              "ACC_AMOUNT":"15.15",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"02.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":15727308,
              "CLIENT_ID":6056596,
              "GROUP__ID":15.000000,
              "GROUP_NAME":"Домашние питомцы"
            }
          },
          "9c496583b1ccd43a80b369d8d45e0d60":{
            1638538245:{
              "TRANS_DATE":"2019-07-30T00:00:00",
              "TRANS_AMOUNT":"-10.11",
              "TRANS_CURR":"BYN",
              "DOC_ID":1638538245,
              "TRANS_DETAILS":"Retail BLR p.YUBILEYNYI D-R \"OSTROV CHISTOTY\"",
              "SIC_CODE":"5399",
              "ACC_AMOUNT":"10.11",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"01.08.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":15727308,
              "CLIENT_ID":6056596,
              "GROUP__ID":6.000000,
              "GROUP_NAME":"Покупки"
            }
          }
        },
        "pfmDataPlus":{
          "d8bec4b0df7fd717194c9711fc62ca1a":{
            1636451134:{
              "TRANS_DATE":"2019-07-28T00:00:00",
              "TRANS_AMOUNT":"200.00",
              "TRANS_CURR":"BYN",
              "DOC_ID":1636451134,
              "TRANS_DETAILS":"CH Payment BLR IB SBS BVB PEREVOD SAME CARD",
              "SIC_CODE":"6028",
              "ACC_AMOUNT":"200.00",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"29.07.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":15727308,
              "CLIENT_ID":6056596,
              "GROUP__ID":20.000000,
              "GROUP_NAME":"Финансовые операции"
            },
            1635965868:{
              "TRANS_DATE":"2019-07-27T00:00:00",
              "TRANS_AMOUNT":"150.00",
              "TRANS_CURR":"BYN",
              "DOC_ID":1635965868,
              "TRANS_DETAILS":"CH Payment BLR MINSK KHUTKA NA KARTKU",
              "SIC_CODE":"6012",
              "ACC_AMOUNT":"150.00",
              "ACC_CURR":"BYN",
              "ACCOUNT_DATE":"29.07.2019",
              "FEE_AMOUNT":0.000000,
              "CARD":"5456...5800",
              "CARD_ID":15727308,
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
            "amount":"50.95",
            "PERCENT":44.000000,
            "COLOR":"#FF6600"
          },
          {
            "gkey":"e2598feebf04d17945b8800ddc441d46",
            "group":"Мобильная связь",
            "ACC_CURR":"BYN",
            "amount":"30.00",
            "PERCENT":26.000000,
            "COLOR":"#B0DE09"
          },
          {
            "gkey":"4e92f018e8fd6c86d9face16c0306e2b",
            "group":"Домашние питомцы",
            "ACC_CURR":"BYN",
            "amount":"15.15",
            "PERCENT":13.000000,
            "COLOR":"#FF9E01"
          },
          {
            "gkey":"9c496583b1ccd43a80b369d8d45e0d60",
            "group":"Покупки",
            "ACC_CURR":"BYN",
            "amount":"10.11",
            "PERCENT":9.000000,
            "COLOR":"#63d8ff"
          },
          {
            "gkey":"4b85473c1cfe07a8ba5adbbbd0a16ca6",
            "group":"Образование",
            "ACC_CURR":"BYN",
            "amount":"7.00",
            "PERCENT":6.000000,
            "COLOR":"#F8FF01"
          },
          {
            "gkey":"d8bec4b0df7fd717194c9711fc62ca1a",
            "group":"Финансовые операции",
            "ACC_CURR":"BYN",
            "amount":"1.90",
            "PERCENT":2.000000,
            "COLOR":"#F9CE1D"
          },
          {
            "gkey":"d9c36c061163728c9243aa92b4922413",
            "group":"Продукты",
            "ACC_CURR":"BYN",
            "amount":"1.69",
            "PERCENT":1.000000,
            "COLOR":"#4CB050"
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
        "dataXYgraph":null,
        "dataCategGraph":[
          {
            "e2598feebf04d17945b8800ddc441d46":30.000000,
            "date":"2019-07-31",
            "d9c36c061163728c9243aa92b4922413":1.690000
          },
          {
            "9c496583b1ccd43a80b369d8d45e0d60":10.110000,
            "date":"2019-08-01",
            "4b85473c1cfe07a8ba5adbbbd0a16ca6":7.000000
          },
          {
            "d8bec4b0df7fd717194c9711fc62ca1a":1.900000,
            "date":"2019-08-02",
            "d4d4cdfc8a2158758b1b8e474b584321":50.950000,
            "4e92f018e8fd6c86d9face16c0306e2b":15.150000
          }
        ],
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
    }}';
  /* eslint-enable */
  fetchMock.once({
    matcher: function (url, body) {
      return url === 'https://www.belveb24.by/admin.php?xoadCall=true' && queryString.stringify(body).indexOf('getPFMdata') > -1
    },
    response: {
      status: 200,
      body: '{"returnValue":null,"returnObject":{"result":{"pfmData":{\n' +
        '\n' +
        '"d4d4cdfc8a2158758b1b8e474b584321":{\n' +
        '\n' +
        '1639374640:{"TRANS_DATE":"2019-07-31T00:00:00","TRANS_AMOUNT":"-48.95","TRANS_CURR":"BYN","DOC_ID":1639374640,"TRANS_DETAILS":"Retail BLR MINSK.R-N AZS N 33 BAPB","SIC_CODE":"5541","ACC_AMOUNT":"48.95","ACC_CURR":"BYN","ACCOUNT_DATE":"02.08.2019","FEE_AMOUNT":0.000000,"CARD":"5456...5800","CARD_ID":15727308,"CLIENT_ID":6056596,"GROUP__ID":7.000000,"GROUP_NAME":"\u0410\u0432\u0442\u043e \u0438 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442"},\n' +
        '\n' +
        '1639507829:{"TRANS_DATE":"2019-08-01T00:00:00","TRANS_AMOUNT":"-2.00","TRANS_CURR":"BYN","DOC_ID":1639507829,"TRANS_DETAILS":"Retail BLR Minsk PTS 777 AVTOMOBILNYY P","SIC_CODE":"7523","ACC_AMOUNT":"2.00","ACC_CURR":"BYN","ACCOUNT_DATE":"02.08.2019","FEE_AMOUNT":0.000000,"CARD":"5456...5800","CARD_ID":15727308,"CLIENT_ID":6056596,"GROUP__ID":7.000000,"GROUP_NAME":"\u0410\u0432\u0442\u043e \u0438 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442"}},\n' +
        '\n' +
        '"4e92f018e8fd6c86d9face16c0306e2b":{1639383770:{"TRANS_DATE":"2019-07-31T00:00:00","TRANS_AMOUNT":"-15.15","TRANS_CURR":"BYN","DOC_ID":1639383770,"TRANS_DETAILS":"Retail BLR MINSK SHOP ZOOMARKET BPSB","SIC_CODE":"5995","ACC_AMOUNT":"15.15","ACC_CURR":"BYN","ACCOUNT_DATE":"02.08.2019","FEE_AMOUNT":0.000000,"CARD":"5456...5800","CARD_ID":15727308,"CLIENT_ID":6056596,"GROUP__ID":15.000000,"GROUP_NAME":"\u0414\u043e\u043c\u0430\u0448\u043d\u0438\u0435 \u043f\u0438\u0442\u043e\u043c\u0446\u044b"}},\n' +
        '\n' +
        '"9c496583b1ccd43a80b369d8d45e0d60":{1638538245:{"TRANS_DATE":"2019-07-30T00:00:00","TRANS_AMOUNT":"-10.11","TRANS_CURR":"BYN","DOC_ID":1638538245,"TRANS_DETAILS":"Retail BLR p.YUBILEYNYI D-R \\"OSTROV CHISTOTY\\"","SIC_CODE":"5399","ACC_AMOUNT":"10.11","ACC_CURR":"BYN","ACCOUNT_DATE":"01.08.2019","FEE_AMOUNT":0.000000,"CARD":"5456...5800","CARD_ID":15727308,"CLIENT_ID":6056596,"GROUP__ID":6.000000,"GROUP_NAME":"\u041f\u043e\u043a\u0443\u043f\u043a\u0438"}}\n' +
        '},\n' +
        '\n' +
        '"pfmDataPlus":{\n' +
        '"d8bec4b0df7fd717194c9711fc62ca1a":{\n' +
        '\n' +
        '1636451134:{"TRANS_DATE":"2019-07-28T00:00:00","TRANS_AMOUNT":"200.00","TRANS_CURR":"BYN","DOC_ID":1636451134,"TRANS_DETAILS":"CH Payment BLR IB SBS BVB PEREVOD SAME CARD","SIC_CODE":"6028","ACC_AMOUNT":"200.00","ACC_CURR":"BYN","ACCOUNT_DATE":"29.07.2019","FEE_AMOUNT":0.000000,"CARD":"5456...5800","CARD_ID":15727308,"CLIENT_ID":6056596,"GROUP__ID":20.000000,"GROUP_NAME":"\u0424\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438"}\n' +
        '\n' +
        ',1635965868:{"TRANS_DATE":"2019-07-27T00:00:00","TRANS_AMOUNT":"150.00","TRANS_CURR":"BYN","DOC_ID":1635965868,"TRANS_DETAILS":"CH Payment BLR MINSK KHUTKA NA KARTKU","SIC_CODE":"6012","ACC_AMOUNT":"150.00","ACC_CURR":"BYN","ACCOUNT_DATE":"29.07.2019","FEE_AMOUNT":0.000000,"CARD":"5456...5800","CARD_ID":15727308,"CLIENT_ID":6056596,"GROUP__ID":20.000000,"GROUP_NAME":"\u0424\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438"}\n' +
        '}},\n' +
        '\n' +
        '"groups":[\n' +
        '{"gkey":"d4d4cdfc8a2158758b1b8e474b584321","group":"\u0410\u0432\u0442\u043e \u0438 \u0442\u0440\u0430\u043d\u0441\u043f\u043e\u0440\u0442","ACC_CURR":"BYN","amount":"50.95","PERCENT":44.000000,"COLOR":"#FF6600"},\n' +
        '{"gkey":"e2598feebf04d17945b8800ddc441d46","group":"\u041c\u043e\u0431\u0438\u043b\u044c\u043d\u0430\u044f \u0441\u0432\u044f\u0437\u044c","ACC_CURR":"BYN","amount":"30.00","PERCENT":26.000000,"COLOR":"#B0DE09"},\n' +
        '{"gkey":"4e92f018e8fd6c86d9face16c0306e2b","group":"\u0414\u043e\u043c\u0430\u0448\u043d\u0438\u0435 \u043f\u0438\u0442\u043e\u043c\u0446\u044b","ACC_CURR":"BYN","amount":"15.15","PERCENT":13.000000,"COLOR":"#FF9E01"},\n' +
        '{"gkey":"9c496583b1ccd43a80b369d8d45e0d60","group":"\u041f\u043e\u043a\u0443\u043f\u043a\u0438","ACC_CURR":"BYN","amount":"10.11","PERCENT":9.000000,"COLOR":"#63d8ff"},\n' +
        '{"gkey":"4b85473c1cfe07a8ba5adbbbd0a16ca6","group":"\u041e\u0431\u0440\u0430\u0437\u043e\u0432\u0430\u043d\u0438\u0435","ACC_CURR":"BYN","amount":"7.00","PERCENT":6.000000,"COLOR":"#F8FF01"},\n' +
        '{"gkey":"d8bec4b0df7fd717194c9711fc62ca1a","group":"\u0424\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438","ACC_CURR":"BYN","amount":"1.90","PERCENT":2.000000,"COLOR":"#F9CE1D"},\n' +
        '{"gkey":"d9c36c061163728c9243aa92b4922413","group":"\u041f\u0440\u043e\u0434\u0443\u043a\u0442\u044b","ACC_CURR":"BYN","amount":"1.69","PERCENT":1.000000,"COLOR":"#4CB050"}],\n' +
        '\n' +
        '"groupsPlus":[{"gkey":"d8bec4b0df7fd717194c9711fc62ca1a","group":"\u0424\u0438\u043d\u0430\u043d\u0441\u043e\u0432\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0446\u0438\u0438","ACC_CURR":"BYN","amount":"16050.00","PERCENT":100.000000,"COLOR":"#F9CE1D"}]\n' +
        ',"sum":"116.80","sumPlus":"0.00","dataXYgraph":null,"dataCategGraph":[{"e2598feebf04d17945b8800ddc441d46":30.000000,"date":"2019-07-31","d9c36c061163728c9243aa92b4922413":1.690000},{"9c496583b1ccd43a80b369d8d45e0d60":10.110000,"date":"2019-08-01","4b85473c1cfe07a8ba5adbbbd0a16ca6":7.000000},{"d8bec4b0df7fd717194c9711fc62ca1a":1.900000,"date":"2019-08-02","d4d4cdfc8a2158758b1b8e474b584321":50.950000,"4e92f018e8fd6c86d9face16c0306e2b":15.150000}],"currency":"BYN"},"lct":null,"message":null,"error":null,"__meta":{"result":"a_array","lct":"null","message":"null","error":"null"},"__size":4,"__class":"connector","__url":"\\/belveb24\\/admin.php?xoadCall=true","__uid":"f052cebca2bc0ba729ad7785c9a5f093","__output":null,"__timeout":null,"xroute":function(){return xoad.call(this,"xroute",arguments)}}}'
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
