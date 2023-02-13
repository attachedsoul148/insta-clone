import Image from "next/image"
import React from "react"
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline"
import { HomeIcon } from "@heroicons/react/24/solid"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { useRecoilState } from "recoil"
import { modal } from "../recoil/modalState"

const Header = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const [_, setOpen] = useRecoilState(modal)

  return (
    <div className="border-b shadow bg-white sticky top-0 z-50 w-full">
      <div className="max-w-6xl mx-auto flex items-center justify-between py-3 px-2">
        <div
          className="relative w-10 lg:w-24 h-[40px]"
          onClick={() => router.push("/")}
        >
          <Image
            src="https://links.papareact.com/ocw"
            alt="logo"
            fill
            className="hidden lg:inline-block object-contain cursor-pointer"
          />
          <Image
            src="https://links.papareact.com/jjm"
            alt="logo"
            fill
            className="inline-block lg:hidden object-contain cursor-pointer "
          />
        </div>

        <div className="relative items-center hidden sm:flex">
          <MagnifyingGlassIcon className="h-6 w-6 absolute text-gray-500 left-2" />
          <input
            type="text"
            placeholder="Search"
            className="font-medium
             pl-10 pr-2 text-sm py-2 outline-none 
             ring-1 ring-gray-300 bg-gray-100 border-gray-300 
             rounded-md focus:ring-black focus:border-none focus:ring-2"
          />
        </div>

        <div className="flex space-x-4 items-center">
          {session ? (
            <>
              <HomeIcon
                className="navBtn hidden md:inline"
                onClick={() => router.push("/")}
              />
              <div className="relative hidden md:inline">
                <div className="absolute bg-red-500 rounded-full h-4 w-4 flex items-center justify-center animate-pulse z-10 -top-1 right-0">
                  <p className="text-xs font-medium text-white">7</p>
                </div>
                <PaperAirplaneIcon className="navBtn -rotate-45" />
              </div>
              <UserGroupIcon className="navBtn hidden md:inline" />
              <PlusCircleIcon
                className="navBtn"
                onClick={() => setOpen(true)}
              />
              <Bars3Icon className="navBtn inline md:hidden" />
              <HeartIcon className="navBtn" />
              <img
                onClick={() => signOut()}
                src={session?.user?.image!}
                alt="profile-pic"
                className="rounded-full h-10 w-10 cursor-pointer"
              />
            </>
          ) : (
            <>
              <HomeIcon
                className="navBtn hidden md:inline"
                onClick={() => router.push("/")}
              />
              <Bars3Icon className="navBtn inline md:hidden" />
              <p
                onClick={() => router.push("/auth/signin")}
                className="text-sm text-blue-400 cursor-pointer hover:text-blue-300"
              >
                Sign in
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Header
