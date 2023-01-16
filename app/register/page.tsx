import Head from 'next/head'
import RegisterForm from './components/registerForm'

export default function Register() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <RegisterForm />
      </section>
    </>
  )
}