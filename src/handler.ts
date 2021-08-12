export async function handleRequest(request: Request): Promise<Response> {
  const resp = await fetch ("https://api.commoprices.com/v2/dataseries/INQJK/data", {
    headers: {
      // @ts-ignore
      Authorization: `Bearer ${API_KEY}`
    }
  })
  const response_data = await resp.json()
  const prices = response_data.data.request.dataseries.map((item: any) => ({
    date: item[0],
    price: item[1]
  }) )
  return new Response(JSON.stringify(prices), {
    headers: {
      'Content-type': 'application/json'
    }
  })
}
