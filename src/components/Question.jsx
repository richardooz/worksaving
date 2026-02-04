import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Sparkles } from 'lucide-react'

const Question = ({ onReplay }) => {
  const [result, setResult] = useState(null)
  const [spins, setSpins] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)

  const probabilities = useMemo(
    () => ({ yes: 99.8, no: 0.2 }),
    [],
  )

  const handleAnswer = () => {
    if (isSpinning) return
    setIsSpinning(true)
    setResult(null)
    const roll = Math.random() * 100
    const outcome = roll <= probabilities.yes ? 'yes' : 'no'
    const extraSpin = outcome === 'yes' ? 25 : 8
    setSpins((prev) => prev + 360 * extraSpin + (outcome === 'yes' ? 20 : -20))
    setTimeout(() => {
      setResult(outcome)
      setIsSpinning(false)
    }, 2200)
  }

  const handleShare = async () => {
    if (!result) return
    const text =
      result === 'yes'
        ? 'The wheel says YES 💖 Will you be my valentine?'
        : 'The wheel says NO 😮 (but fate loves a tease). Will you be my valentine?'
    const shareData = {
      title: 'Valentine Roulette',
      text,
      url: window.location.href,
    }

    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${text} ${shareData.url}`)
        alert('Copied to clipboard!')
      }
    } catch (error) {
      console.error('Share failed', error)
    }
  }

  return (
    <motion.div
      className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 rounded-[32px] border border-rose-100 bg-white/80 p-8 text-center shadow-[0_30px_80px_-50px_rgba(244,63,94,0.8)] backdrop-blur"
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 120, damping: 18 }}
    >
      <div className="flex items-center gap-3 text-rose-400">
        <Heart className="h-6 w-6" />
        <p className="font-greatvibes text-4xl text-rose-500">Will you be my valentine?</p>
      </div>

      <p className="max-w-xl font-inter text-base text-slate-600">
        Let’s spin the wheel of fate. The odds are beautifully in our favor.
      </p>

      <div className="relative flex h-56 w-56 items-center justify-center">
        <div className="absolute -top-2 flex items-center justify-center text-rose-400">
          <Sparkles className="h-6 w-6" />
        </div>
        <div className="absolute -top-5 h-5 w-5 rotate-45 rounded-sm bg-rose-500 shadow" />
        <motion.div
          className="relative h-52 w-52 rounded-full border-[8px] border-rose-100 bg-white shadow-[0_25px_60px_-40px_rgba(244,63,94,0.7)]"
          animate={{ rotate: spins }}
          transition={{ duration: 2.2, ease: [0.15, 0.8, 0.2, 1] }}
        >
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-rose-200 via-rose-100 to-rose-300" />
          <div className="absolute inset-4 rounded-full border border-white/60" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="absolute inset-6 rounded-full border border-rose-200/60" />
            <div className="absolute inset-10 rounded-full bg-white/80" />
            <div className="absolute inset-16 rounded-full bg-rose-50" />
            <div className="absolute inset-20 flex items-center justify-center rounded-full bg-white shadow-inner">
              <Heart className="h-6 w-6 text-rose-400" />
            </div>
          </div>

          <div className="absolute inset-0">
            <span
              className="absolute left-1/2 top-1/2 text-xs font-semibold uppercase tracking-[0.4em] text-rose-500"
              style={{ transform: 'translate(-50%, -50%) translateY(-78px)' }}
            >
              YES
            </span>
            <span
              className="absolute left-1/2 top-1/2 text-xs font-semibold uppercase tracking-[0.4em] text-rose-300"
              style={{ transform: 'translate(-50%, -50%) translateY(78px)' }}
            >
              NO
            </span>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center gap-4">
        <motion.button
          onClick={handleAnswer}
          className="rounded-full bg-rose-500 px-8 py-3 text-sm font-semibold text-white shadow-lg shadow-rose-200 transition hover:bg-rose-400 disabled:cursor-not-allowed disabled:opacity-70"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSpinning}
        >
          {isSpinning ? 'Spinning…' : 'Spin the wheel'}
        </motion.button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 rounded-3xl bg-rose-50 px-6 py-4 text-2xl font-semibold text-rose-500"
        >
          {result === 'yes' ? 'Yes 💖' : 'No 😮'}
        </motion.div>
      )}

      {result && (
        <div className="flex flex-col items-center gap-4">
          <p className="max-w-xl text-sm text-rose-400">
            {result === 'yes'
              ? 'Because every sign points to us—and the universe has impeccable taste.'
              : 'Because fate loves a tease. Spin again and let destiny remember our story.'}
          </p>
          <button
            onClick={handleShare}
            className="rounded-full border border-rose-200 bg-white px-6 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400 shadow-sm transition hover:border-rose-300 hover:text-rose-500"
          >
            Share the result
          </button>
        </div>
      )}

      <button
        onClick={onReplay}
        className="text-xs uppercase tracking-[0.3em] text-rose-300"
      >
        Replay the journey
      </button>
    </motion.div>
  )
}

export default Question
