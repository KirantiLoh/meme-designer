import type { NextPage } from 'next'
import { useDrop } from "react-dnd"
import SideNav from '../components/SideNav'
import { useCanvas } from '../context/CanvasContext'
import DragElement from '../components/DragElement'
import { useRef, useState, useEffect, MutableRefObject } from "react"
import * as htmlToImage from 'html-to-image';
import Button from '../components/Button'


const Home: NextPage = () => {

  const { width, height, bgColor, bgImage, layers, setBgImage } = useCanvas();

  const containerRef = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  const [fileName, setFileName] = useState("meme");

  const [, drop] = useDrop(() => ({
    accept: "image",
    drop: (item: IPicture) => setBgImage(item.url)
  }))

  const downloadImage = async () => {
    if (!fileName) return;
   
    const dataUrl = await htmlToImage.toPng(containerRef.current);
   
    const link = document.createElement('a');
    link.download = `${fileName}.png`;
    link.href = dataUrl;
    link.click();
  }

  useEffect(() => {
    window.onbeforeunload = () => ""
  }, []);

  return (
    <main className="flex h-screen overflow-y-hidden  bg-black text-white">
      <SideNav />
      <section className='flex flex-col flex-1'>
        <aside className='relative flex n flex-1 justify-center items-center overflow-auto p-10'>
          <div ref={containerRef}>
            <div 
              style={{
                width,
                height,
                backgroundColor: bgColor,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `url(${bgImage})`,
              }} 
              className="relative flex items-center justify-center transition-all"
              ref={drop}
            >
              {layers.length > 0 && layers.map((val, index) => (
                <DragElement key={index}>
                  {
                    val.type === "heading" ?
                      <h1  
                        onDoubleClick={e => {
                          e.currentTarget.contentEditable = "true";
                          e.currentTarget.focus();
                        }} 
                        onBlur={e => {
                          if (!e.currentTarget.textContent) {
                            e.currentTarget.parentNode?.parentNode?.removeChild(e.currentTarget.parentNode)
                          }
                        }}
                        style={{
                          maxWidth: `${width}px`
                        }}
                        className="text-5xl font-bold bordered-text text-center">
                        {val.content}
                      </h1>
                    :
                    (
                      val.type === "subheading" ?
                      <h3 
                        onDoubleClick={e => {
                          e.currentTarget.contentEditable = "true";
                          e.currentTarget.focus();
                        }} 
                        onBlur={e => {
                          if (!e.currentTarget.textContent) {
                            e.currentTarget.parentNode?.parentNode?.removeChild(e.currentTarget.parentNode)
                          }
                        }}
                        style={{
                          maxWidth: `${width}px`
                        }}
                        className='text-3xl font-bold bordered-text text-center'>
                        {val.content}
                      </h3>
                      :
                      <p 
                        onDoubleClick={e => {
                          e.currentTarget.contentEditable = "true";
                          e.currentTarget.focus();
                        }} 
                        onBlur={e => {
                          if (!e.currentTarget.textContent) {
                            e.currentTarget.parentNode?.parentNode?.removeChild(e.currentTarget.parentNode)
                          }
                        }}
                        style={{
                          maxWidth: `${width}px`
                        }}
                        className='text-xl font-bold bordered-text text-center'>
                        {val.content}
                      </p>
                    )
                  }
                </DragElement>))}
            </div>
          </div>
        </aside>
        <aside className='bg-slate-800 w-full px-5 py-3 flex items-center justify-end gap-3'>
          <div>
            <label htmlFor="fileName" className='text-lg mr-1'>File Name:</label>
            <input type="text" value={fileName} onChange={e => setFileName(e.target.value)} className='p-2' />
          </div>
          <Button disabled={!fileName} onClick={() => downloadImage()}>Download Image</Button>
        </aside>
      </section>
    </main>
  )
}

export default Home
