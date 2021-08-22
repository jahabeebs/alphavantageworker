import { handleRequest } from './handler'
import { scheduledHandleRequest } from './scheduledhandler'

addEventListener('fetch', (event) => {
  event.respondWith(handleRequest(event.request))
})

addEventListener('scheduled', (event) => {
  event.waitUntil(scheduledHandleRequest(event))
})
