import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import GiftBox from './components/GiftBox'
import Letter from './components/Letter'
import Gallery from './components/Gallery'
import AmbientHearts from './components/AmbientHearts'
import Question from './components/Question'
import loveSong from './assets/laufey.mp3'
import memory1 from './assets/memory-1.jpeg'
import memory2 from './assets/memory-2.jpeg'
import memory3 from './assets/memory-3.jpeg'
import memory4 from './assets/memory-4.jpeg'
import memory5 from './assets/memory-5.jpeg'

const App = () => {
  const [stage, setStage] = useState('gift')
  const [isAudioPlaying, setIsAudioPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const audioRef = useRef(null)

  const images = useMemo(
    () => [memory1, memory2, memory3, memory4, memory5],
    [],
  )

  const startAudio = async () => {
    if (!audioRef.current) return
    audioRef.current.muted = isMuted
    audioRef.current.volume = 0.6
    try {
      await audioRef.current.play()
    } catch (error) {
      console.error('Audio play failed', error)
    }
  }

  useEffect(() => {
    if (!audioRef.current) return
    audioRef.current.muted = isMuted
  }, [isMuted])

  useEffect(() => {
    if (!audioRef.current) return
    const audio = audioRef.current

    const handleLoaded = () => setDuration(audio.duration || 0)
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime || 0)
    const handlePlay = () => setIsAudioPlaying(true)
    const handlePause = () => setIsAudioPlaying(false)

    audio.addEventListener('loadedmetadata', handleLoaded)
    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoaded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const handleGiftOpen = async () => {
    await startAudio()
    setTimeout(() => setStage('letter'), 1500)
  }

  const handleShowGallery = () => setStage('gallery')
  const handleShowQuestion = () => setStage('question')
  const handleReplay = () => setStage('gift')

  const toggleMute = () => setIsMuted((prev) => !prev)
  const handleSeek = (value) => {
    if (!audioRef.current || !duration) return
    audioRef.current.currentTime = Number(value) * duration
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-rose-50 text-slate-800">
      <audio ref={audioRef} src={loveSong} loop preload="auto" />
      <AmbientHearts />
      <div className="pointer-events-none absolute -top-32 right-10 h-64 w-64 rounded-full bg-rose-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 left-10 h-72 w-72 rounded-full bg-rose-100/60 blur-3xl" />

      <main className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 py-16">
        <div className="mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-rose-300">Valentine’s Day</p>
          <h1 className="mt-4 font-greatvibes text-5xl text-rose-500 sm:text-6xl">
            For my forever
          </h1>
          <p className="mt-4 max-w-xl font-inter text-base text-slate-600">
            A soft journey from the first spark to every memory we’ve collected.
          </p>
        </div>

        <AnimatePresence mode="wait">
          {stage === 'gift' && (
            <motion.div
              key="gift"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <GiftBox onOpen={handleGiftOpen} />
            </motion.div>
          )}

          {stage === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Letter onNext={handleShowGallery} />
            </motion.div>
          )}

          {stage === 'gallery' && (
            <motion.div
              key="gallery"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full"
            >
              <Gallery
                images={images}
                isMuted={isMuted}
                isAudioPlaying={isAudioPlaying}
                currentTime={currentTime}
                duration={duration}
                onToggleMute={toggleMute}
                onSeek={handleSeek}
                onAsk={handleShowQuestion}
              />
            </motion.div>
          )}

          {stage === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Question onReplay={handleReplay} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
