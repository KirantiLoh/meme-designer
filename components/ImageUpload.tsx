import { useState } from 'react'
import { usePictures } from '../context/PictureContext';
import Picture from './Picture';

const ImageUpload = () => {

    const imageMimeType = /image\/(png|jpg|jpeg)/i;

    const { setImages } = usePictures();

  return (
    <>
        <label htmlFor='addImage' className='w-20 h-20 rounded bg-slate-600 grid place-items-center text-lg cursor-pointer'>Add</label>
        <input 
            type="file" 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                const file = e.target.files[0];
                setImages(prev => [...prev, {id: prev.length, url: URL.createObjectURL(file)}])
              }
            }} 
            id="addImage" 
            accept='.png, .jpg, .jpeg' 
            className='hidden' 
        />
    </>
  )
}

export default ImageUpload