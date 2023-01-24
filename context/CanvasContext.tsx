import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'

const CanvasContext = createContext({
    width: 512,
    height: 512,
    bgColor: "#fff",
    bgImage: "",
    layers: [] as ILayer[],
    setWidth: undefined as unknown as Dispatch<SetStateAction<number>>,
    setHeight: undefined as unknown as Dispatch<SetStateAction<number>>,
    setBgColor: undefined as unknown as Dispatch<SetStateAction<string>>,
    setBgImage: undefined as unknown as Dispatch<SetStateAction<string>>,
    setLayers: undefined as unknown as Dispatch<SetStateAction<ILayer[]>>,
})

export const CanvasProvider = ({children}: {children: ReactNode}) => {

    const [width, setWidth] = useState(512);
    const [height, setHeight] = useState(512);
    const [bgColor, setBgColor] = useState("#ffffff");
    const [bgImage, setBgImage] = useState("");
    const [layers, setLayers] = useState<ILayer[]>([]);

    const contextValue = {
        width, 
        height,
        bgColor,
        setBgColor,
        setHeight,
        setWidth,
        layers,
        setLayers,
        setBgImage,
        bgImage,
    }

  return (
    <CanvasContext.Provider value={contextValue}>
        {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => useContext(CanvasContext);


