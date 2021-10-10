export async function scheduledHandleRequest(event: any) {
  return new Promise((resolve) => {
    const commodityCode = ['INQJK', 'INQD4']
    const databaseCode = ['Coffee', 'CoffeeArabica']
    for (let i = 0; i < commodityCode.length; i++) {
      const resp = fetch('https://api.commoprices.com/v2/dataseries/' + commodityCode[i] + '/data', {
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
        throw new Error('No data returned')
      } else {
        resolve(resp)
      }
    }
  })
}