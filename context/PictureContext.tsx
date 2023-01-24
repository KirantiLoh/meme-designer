import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

const PictureContext = createContext({
    images: [] as IPicture[],
    setImages: undefined as unknown as Dispatch<SetStateAction<IPicture[]>>
})

export const PictureProvider = ({children}: {children: ReactNode}) => {

    const [images, setImages] = useState<IPicture[]>([
        {
            id: 0,
            url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqPBF166wuR_qR6uXRcCxyHSG93_QA9rGYgpPpmnGOuA&s"
        }
    ])

    const contextValue = {
        images, setImages
    }

  return (
    <PictureContext.Provider value={contextValue}>
        {children}
    </PictureContext.Provider>
  )
}

export const usePictures = () => useContext(PictureContext);


