export async function handleRequest(request: Request): Promise<Response> {
  // @ts-ignore
  const resp = await fetch (`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=AAPL&apikey=${API_KEY}`, {
     headers: {
    }
  })
  const data = await resp.json()
  return new Response(JSON.stringify(data), {
    headers: {
      'Content-type': 'application/json'
    }
  })
  // const { query } = await request.json()
  // return new Response(`Your query was ${query}`)
}
