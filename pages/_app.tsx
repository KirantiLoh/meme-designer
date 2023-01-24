import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { DndProvider } from 'react-dnd'
import Head from 'next/head'
import { HTML5Backend } from "react-dnd-html5-backend"
import { PictureProvider } from '../context/PictureContext'
import { CanvasProvider } from '../context/CanvasContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <DndProvider backend={HTML5Backend}>
      <CanvasProvider>
        <PictureProvider>
          <Head>
            <title>Meme Designer | Case B</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Component {...pageProps} />
        </PictureProvider>
      </CanvasProvider>
    </DndProvider>
  )
}

export default MyApp
