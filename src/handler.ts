export async function handleRequest(request: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '86400',
  }
  if (request.method === 'OPTIONS') {
    return new Response('OK', { headers: corsHeaders })
  }

  if (request.method === 'GET') {
    return getItemData(request)
  } else {
    return new Response('Unsupported request', { status: 500 })
  }
}

const getItemData = async (request: Request) => {
  let response: Response
  const availableCommodities = ['Coffee', 'CoffeeArabica', 'Bananas']
  const headerKeyValue = request.headers.get('Key') as string
  switch (request.method == 'GET') {
    case availableCommodities.includes(headerKeyValue): {
      // @ts-ignore
      const prices = await PRICES_DB.get(headerKeyValue)
      const pricesAsJSON = JSON.parse(prices)
      if (pricesAsJSON == null) {
        return new Response('Data was null for given commodity', { status: 500 })
      }
      return new Response(JSON.stringify(pricesAsJSON), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Max-Age': '86400',
        },
      })
    }
    default:
      response = new Response('No data found for given item', { status: 500 })
      break
  }
  return response
}
