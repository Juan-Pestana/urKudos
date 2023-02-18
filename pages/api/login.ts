import type { NextApiRequest, NextApiResponse } from 'next'

import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { authString } = req.body

    if (authString) {
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('pb_auth', authString, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== 'development',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/',
        })
      )

      res.status(200).json({ user: 'user loged on server' })
    } else {
      res.status(405).json({ message: 'not allowed' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
