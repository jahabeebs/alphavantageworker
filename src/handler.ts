export async function handleRequest(request: Request): Promise<Response> {
  const corsHeaders = {
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '86400'
  }
  if (request.method === "OPTIONS") {
    return new Response("OK", { headers: corsHeaders })
  }

  if (request.method === "GET") {
    return getItemData(request)
  } else {
    return new Response('Unsupported request', { status: 500 })
  }
}

const getItemData = async (request: Request) => {
  let response: Response
  switch (request.method == 'GET') {
    case request.headers.get('Key') === 'Coffee': {
      // @ts-ignore
      const prices = await PRICES_DB.get('Coffee')
      return new Response(JSON.stringify(prices), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    }
    default:
      response = new Response('No data found for given item', { status: 500 })
      break
  }
  return response
}
