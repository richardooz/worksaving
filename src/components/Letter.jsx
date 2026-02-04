import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const Letter = ({ onNext }) => {
  const message = useMemo(
    () =>
      "Pika, every beat of my heart whispers your name. You are my calm morning light, my favorite memory, and the home I never want to leave. Thank you for choosing me, for growing with me, and for making ordinary days feel like poetry. I love the way you turn quiet moments into something warm, the way your laugh lingers in my chest long after the day ends. I promise to keep holding your hand through every sunrise and every storm, to celebrate the small wins, and to never let you forget how precious you are to me. This love is my favorite story, and I want to keep writing it with you page after page, year after year.",
    [],
  )
  const [displayedText, setDisplayedText] = useState('')

  useEffect(() => {
    let index = 0
    const tick = () => {
      index += 1
      setDisplayedText(message.slice(0, index))
      if (index < message.length) {
        setTimeout(tick, 28)
      }
    }
    const timeout = setTimeout(tick, 400)
    return () => clearTimeout(timeout)
  }, [message])

  return (
    <motion.div
      className="mx-auto w-full max-w-3xl rounded-[32px] border border-rose-100 bg-white/80 p-8 shadow-[0_30px_80px_-50px_rgba(244,63,94,0.8)] backdrop-blur"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="flex items-center gap-3 text-rose-400">
        <Heart className="h-6 w-6" />
        <p className="font-greatvibes text-3xl text-rose-500">My dearest love</p>
      </div>
      <p className="mt-3 text-xs uppercase tracking-[0.35em] text-rose-300">
        To 122125
      </p>
      <div className="mt-6 text-[1.05rem] leading-relaxed text-slate-700">
        <p className="min-h-[160px] font-inter">{displayedText}</p>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-rose-300"></p>
          <p className="mt-2 text-xs uppercase tracking-[0.35em] text-rose-200">— 147258</p>
        </div>
        <motion.button
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-400"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          See Our Journey
        </motion.button>
      </div>
    </motion.div>
  )
}

export default Letter
