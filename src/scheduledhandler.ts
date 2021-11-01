export async function scheduledHandleRequest(event: any) {
  return new Promise((resolve) => {
    const commodityCode = ['INQJK', 'INQD4', 'WU1K8', 'IZ637', 'RV1I8', 'SK6RP', 'AX1RI',
      'THJW7', 'ERU4R', 'GI6LT', 'FK36G', 'E397H']
    const databaseCode = ['Coffee', 'CoffeeArabica', 'Bananas', 'Cocoa', 'PalmOil',
      'Soybeans', 'Barley', 'Maize', 'Oranges', 'Tea', 'Wheat', 'Sugar']
    for (let i = 0; i < commodityCode.length; i++) {
      const stringToFetch = 'https://api.commoprices.com/v2/dataseries/' + commodityCode[i] + '/data'
      const resp = fetch(stringToFetch, {
        headers: {
          // @ts-ignore
          Authorization: `Bearer ${API_KEY}`,
          Accept: 'application/json',
        },
      }).then((respuesta) => respuesta.json())
        .then((respuesta) => respuesta.data.request.dataseries.map((item: any) => ({
          date: item[0],
          price: item[1],
        })))
        // @ts-ignore
        .then((respuesta) => PRICES_DB.put(databaseCode[i], JSON.stringify(respuesta)))
      if (resp == null) {
        console.log('No data returned for ' + databaseCode[i])
      }
      if (i === (commodityCode.length - 1)) {
        resolve(resp)
      }
    }
  })
}