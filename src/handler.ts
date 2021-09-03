export async function handleRequest(request: Request): Promise<Response> {
  let response: Response
  switch (request.method == 'GET') {
    case request.headers.get('Key') === 'Coffee': {
      // @ts-ignore
      const prices = await PRICES_DB.get('Coffee')
      return new Response(JSON.stringify(prices), {
        headers: {
          'Content-type': 'application/json',
        },
      })
    }
    default:
      response = new Response('No data found for given item', { status: 500 })
      break
  }
  return response
}
