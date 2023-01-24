import React from 'react'
import { useDrag } from "react-dnd"

const Picture = ({
    id,
    url
}: IPicture) => {

    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { url, id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

  return (
    <div ref={drag} className={`relative w-20 h-20 aspect-square bg-slate-500 transition-all rounded overflow-hidden ${isDragging ? "opacity-60" : ""}`}>
        <img src={url} />
    </div>
  )
}

export default Picture