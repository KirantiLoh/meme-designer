import { } from 'react'
import { useCanvas } from '../context/CanvasContext'
import { usePictures } from '../context/PictureContext';
import ImageUpload from './ImageUpload';
import Picture from './Picture';

const SideNav = () => {

    const { bgColor, height, width, setWidth, setHeight, setBgColor, setLayers, setBgImage } = useCanvas();

    const { images } = usePictures();

  return (
    <nav className='w-[300px] bg-slate-700 bg-opacity-60 p-5 flex flex-col gap-6 overflow-y-auto z-10'>
        <h1 className='text-3xl text-center font-bold'>Meme Designer</h1>
            <section>
                <h2 className='text-2xl font-semibold'>
                    Canvas
                </h2>
                <div className='flex flex-col gap-3 pt-2 pb-4'>
                    <div className="flex items-center justify-between">
                        <label htmlFor="width">Width</label>
                        <input type="number" id="width" value={width} onChange={e => setWidth(Number(e.target.value) || 1)} className='text-black max-w-[9ch]' />
                    </div>
                    <div className="flex items-center justify-between">
                        <label htmlFor="height">Height</label>
                        <input type="number" id="height" value={height} onChange={e => setHeight(Number(e.target.value) || 1)} className='text-black max-w-[9ch]' />
                    </div>
                </div>
            </section>
            <section>
                <h2 className='text-2xl font-semibold'>
                    Add Text
                </h2>
                <div className="opacity-70 mt-3">
                    <h1 className="text-5xl font-bold" onClick={() => setLayers(prev => [...prev, {index: prev.length, content: "Heading", type: "heading"}])}>
                        Heading
                    </h1>
                    <h3 className='text-3xl font-bold my-2' onClick={() => setLayers(prev => [...prev, {index: prev.length, content: "Subheading", type: "subheading"}])}>
                        Sub Heading
                    </h3>
                    <p className='text-xl font-bold' onClick={() => setLayers(prev => [...prev, {index: prev.length, content: "Text", type: "text"}])}>Text</p>
                </div>
            </section>
            <section>
                <h2 className='text-2xl font-semibold'>
                    Background Image
                </h2>
                <ul className='mt-4 flex flex-wrap gap-2'>
                    <div onClick={() => setBgImage("")} className="w-20 h-20 rounded bg-slate-600 grid place-items-center text-lg cursor-pointer">
                        None
                    </div>
                    <div className="flex items-center gap-2">
                        <label htmlFor="bgColor" style={{backgroundColor: bgColor}} className='block w-20 h-20 rounded'>
                            <input type="color" className='hidden' id='bgColor' value={bgColor} onChange={e => setBgColor(e.target.value)} />
                        </label>
                    </div>
                    <ImageUpload />
                    {images.length > 0 ?
                        images.map((image, index) => <Picture key={index} {...image} />)
                        :
                        <h3>No pictures...</h3>
                    }
                </ul>
            </section>
    </nav>
  )
}

export default SideNav