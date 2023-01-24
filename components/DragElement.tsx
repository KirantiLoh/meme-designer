import { MutableRefObject, ReactNode, useLayoutEffect, useState } from 'react'
import { useDrag } from "@use-gesture/react"
import { useSpring, animated } from '@react-spring/web'
import { useRef } from "react"
import { useCanvas } from '../context/CanvasContext'

const DragElement = ({
    children
}: {
    children: ReactNode
}) => {
    
    const { width, height } = useCanvas();
    
  const objectRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement>;

  const [objWidth, setObjWidth] = useState(0);
  const [objHeight, setObjHeight] = useState(0);

  const [{ x, y }, spring] = useSpring(() => ({ x: 0, y: 0 }))

  const bind = useDrag(({ down, offset: [ox, oy] }) => {
    spring.start({ x: ox, y: oy, immediate: down })
  }, {
    bounds: {
      left: -(width / 2 - objWidth / 2), right: (width / 2 - objWidth / 2), top: -(height / 2 - objHeight / 2), bottom: (height / 2 - objHeight / 2)
    }
  });

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      setObjWidth(objectRef.current.offsetWidth);
      setObjHeight(objectRef.current.offsetHeight);  
    });
    resizeObserver.observe(objectRef.current);
    return () => resizeObserver.disconnect();
  }, [])

  return (
    <animated.div ref={objectRef} {...bind()} style={{x,y,position: "absolute"}}>
        {children}
    </animated.div>
  )
}

export default DragElement