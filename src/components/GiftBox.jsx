import { useState } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

const GiftBox = ({ onOpen }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleOpen = () => {
    if (isOpen) return
    setIsOpen(true)
    confetti({
      particleCount: 140,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#fb7185', '#fda4af', '#fecdd3', '#f43f5e'],
    })
    onOpen?.()
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <motion.div
        onClick={handleOpen}
        className="relative h-72 w-72 cursor-pointer select-none"
        animate={
          isOpen
            ? { scale: 1 }
            : { scale: [1, 1.03, 1], transition: { repeat: Infinity, duration: 1.8 } }
        }
        style={{ perspective: 1000 }}
      >
        <div className="absolute inset-0 rounded-[32px] bg-rose-200/50 blur-2xl" />

        <div className="absolute left-1/2 top-8 h-40 w-56 -translate-x-1/2">
          <motion.div
            className="absolute -top-10 left-1/2 h-14 w-60 -translate-x-1/2 rounded-2xl bg-gradient-to-b from-rose-200 via-rose-300 to-rose-400 shadow-[0_20px_40px_-20px_rgba(244,63,94,0.8)]"
            style={{ transformOrigin: 'bottom center' }}
            animate={
              isOpen
                ? { y: -24, rotateX: 38, rotateZ: -6 }
                : { y: 0, rotateX: 0, rotateZ: 0 }
            }
            transition={{ type: 'spring', stiffness: 160, damping: 14 }}
          >
            <div className="absolute inset-0 rounded-2xl border border-white/60" />
          </motion.div>

          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-rose-200 via-rose-300 to-rose-400 shadow-[0_30px_70px_-40px_rgba(244,63,94,0.75)]" />
          <div className="absolute inset-0 rounded-[28px] border border-white/70" />
          <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-white/40 to-transparent" />

          <div className="absolute left-1/2 top-0 h-full w-8 -translate-x-1/2 bg-rose-100/90 shadow-[inset_0_0_12px_rgba(255,255,255,0.7)]" />
          <div className="absolute left-0 top-1/2 h-8 w-full -translate-y-1/2 bg-rose-100/90 shadow-[inset_0_0_12px_rgba(255,255,255,0.7)]" />

          <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-50 shadow-inner" />
          <div className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/90" />
        </div>

        <div className="absolute left-1/2 top-[150px] h-20 w-40 -translate-x-1/2 rounded-[30px] bg-rose-100/50 blur-2xl" />
      </motion.div>
      <p className="text-center font-inter text-sm uppercase tracking-[0.25em] text-rose-400">
        Tap the gift to open
      </p>
    </div>
  )
}

export default GiftBox
