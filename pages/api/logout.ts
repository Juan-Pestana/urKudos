import { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    //DESTRUIR LA COOKIE

    res.setHeader(
      'Set-Cookie',
      cookie.serialize('pb_auth', '', {
        httpOnly: true,

        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )

    res.status(200).json({ message: 'Succesful LogOut' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} not allowed` })
  }
}
