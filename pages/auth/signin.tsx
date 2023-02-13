import { GetServerSidePropsContext } from 'next'
import { getServerSession } from 'next-auth'
import { BuiltInProviderType } from 'next-auth/providers'
import { ClientSafeProvider, getProviders, LiteralUnion, signIn } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Header from '../../components/Header'
import { authOptions } from '../api/auth/[...nextauth]'

interface Props {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider>
}
const signin: React.FC<Props> = ({ providers }) => {
  return (
    <div>
      <Head>
        <title>Sign in</title>
        <link
          rel="shortcut icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
        />
      </Head>
      <Header />
      <div className="relative my-32 h-[80px] max-w-xl md:h-[120px] lg:h-[160px] mx-auto flex items-center justify-center flex-col">
        <Image
          src="https://links.papareact.com/ocw"
          alt="logo"
          fill
          className="object-contain cursor-pointer"
        />
      </div>
      <>
        {Object.values(providers).map((provider) => (
          <p
            key={provider.name}
            className="mx-auto -mt-20 text-xs md:text-sm cursor-pointer w-[180px] lg:w-[300px] py-2 bg-blue-500 text-white font-medium rounded-lg text-center"
            onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </p>
        ))}
      </>
    </div>
  )
}

export default signin

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const session = await getServerSession(context.req, context.res, authOptions)

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } }
  }

  const providers = await getProviders()

  return {
    props: {
      providers,
    },
  }
}
