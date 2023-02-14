import { Transition, Dialog } from "@headlessui/react"
import React, { Fragment, useState, useRef } from "react"
import { useRecoilState } from "recoil"
import { modal } from "../recoil/modalState"
import { CameraIcon } from "@heroicons/react/24/outline"
import {
  addDoc,
  collection,
  doc,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import { db, storage } from "../firebase"
import { useSession } from "next-auth/react"
import { getDownloadURL, ref, uploadString } from "firebase/storage"

const Modal = () => {
  const [open, setOpen] = useRecoilState(modal)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState("")
  const [loading, setLoading] = useState(false)
  const [photoToUpload, setPhotoToUpload] = useState<null | string>(null)
  const { data: session } = useSession()

  const addPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader()
    if (!e.target.files) return

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0])
    }
    reader.onload = (readerEvent) => {
      setPhotoToUpload(readerEvent.target?.result as string)
    }
  }

  const addPost = async () => {
    if (value && photoToUpload) {
      setLoading(true)
      const docRef = await addDoc(collection(db, "posts"), {
        name: session?.user.name,
        email: session?.user.email,
        userImage: session?.user.image,
        text: value,
        likesCount: 0,
        timestamp: Timestamp.now(),
      })
      if (photoToUpload) {
        const imageRef = ref(storage, `posts/${docRef.id}/image`)

        await uploadString(imageRef, photoToUpload, "data_url").then(
          async (snapshot) => {
            const url = await getDownloadURL(snapshot.ref)
            updateDoc(doc(db, "posts", docRef.id), {
              postImage: url,
            })
          }
        )
      }

      setOpen(false)
      setLoading(false)
      setPhotoToUpload(null)
      setValue("")
    }
  }

  return (
    <Transition show={open} as={Fragment}>
      <Dialog onClose={() => setOpen(false)}>
        <div className="fixed top-0 flex w-full h-full items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              className="bg-white left-[13vmax] top-[20vh] mx-auto 
          border p-4 rounded-md w-[300px] h-auto flex flex-col items-center justify-center space-y-2"
            >
              {loading ? (
                <p>Uploading...</p>
              ) : (
                <>
                  {photoToUpload && (
                    <img src={photoToUpload} className="w-full" />
                  )}
                  <CameraIcon
                    onClick={() => fileInputRef.current?.click()}
                    className="h-10 w-10 bg-red-100
             text-red-300 hover:bg-red-200 p-1 rounded-full cursor-pointer transition-colors"
                  />
                  <p className="text-sm">Upload a photo</p>
                  <input
                    type="text"
                    className="outline-none border-none text-sm
             py-1 w-full"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Pls enter the capture"
                  />
                  <button
                    onClick={addPost}
                    className="text-sm text-white font-medium text-center
               w-full py-2 bg-red-300 rounded-lg hover:bg-red-400 transition-colors"
                    disabled={!value}
                  >
                    Upload post
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    hidden
                    onChange={(e) => addPhoto(e)}
                  />
                </>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
export default Modal
