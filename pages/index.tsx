import type { NextPage } from "next"
import { getSession } from "next-auth/react"
import Head from "next/head"
import Image from "next/image"
import Feed from "../components/Feed"
import Header from "../components/Header"
import Modal from "../components/Modal"

const Home: NextPage = () => {
  return (
    <div className="bg-gray-50">
      <Head>
        <title>Instagram</title>
        <link
          rel="shortcut icon"
          href="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/2048px-Instagram_logo_2016.svg.png"
        />
      </Head>

      <Header />

      <main className="py-5">
        <Feed />
      </main>
      <Modal />
    </div>
  )
}

export default Home
