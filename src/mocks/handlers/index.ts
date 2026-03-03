import { delay, http, HttpResponse } from 'msw'

export const handlers = [
  http.all('*', async () => {
    await delay(300)
  }),
  http.get('/api/health', () => {
    return HttpResponse.json({ ok: true })
  }),
  http.post('/api/auth/login', () => {
    return HttpResponse.json({
      accessToken: 'mock-access-token',
    })
  }),
]
