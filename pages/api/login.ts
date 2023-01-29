import type { NextApiRequest, NextApiResponse } from 'next'
import { pb } from '../../sevices/pocketBase'

import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { email, password } = req.body

    const authData = await pb
      .collection('users')
      .authWithPassword(email, password)

    if (authData.token) {
      res.setHeader(
        'Set-Cookie',
        pb.authStore.exportToCookie({ httpOnly: false })
      )

      res.status(200).json({ user: authData.record })
    } else {
      res.status(405).json({ message: 'not allowed' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
