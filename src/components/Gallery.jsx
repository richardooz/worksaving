import { motion } from 'framer-motion'
import { Heart, Sparkles, Volume2, VolumeX } from 'lucide-react'

const Gallery = ({
  images,
  isMuted,
  isAudioPlaying,
  currentTime,
  duration,
  onToggleMute,
  onSeek,
  onAsk,
}) => {
  const progress = duration ? Math.min(currentTime / duration, 1) : 0
  const formatTime = (value) => {
    if (!Number.isFinite(value)) return '0:00'
    const minutes = Math.floor(value / 60)
    const seconds = Math.floor(value % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }
  return (
    <div className="relative">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <div className="flex flex-col gap-4">
          <p className="text-sm uppercase tracking-[0.4em] text-rose-300">Our Memories</p>
          <h2 className="font-greatvibes text-5xl text-slate-800">
            A gallery of us
          </h2>
          <p className="max-w-2xl font-inter text-base text-slate-600">
            Moments that feel like a soft melody. Scroll gently and hover to relive the warmth.
          </p>
        </div>

        <div className="relative">
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-6 pr-10 sm:gap-6">
            {images.map((image, index) => (
              <motion.div
                key={image}
                className="group relative h-[220px] w-[180px] flex-shrink-0 snap-center overflow-hidden rounded-[24px] bg-rose-100 shadow-[0_25px_60px_-40px_rgba(244,63,94,0.7)] sm:h-[280px] sm:w-[220px] lg:h-[340px] lg:w-[260px]"
                style={{ perspective: 1200 }}
                whileHover={{ rotateX: 6, rotateY: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 140, damping: 14 }}
              >
                <img
                  src={image}
                  alt={`Memory ${index + 1}`}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-rose-500/40 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
                <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-rose-500 shadow">
                  <Heart className="h-3.5 w-3.5" />
                  Memory {index + 1}
                </div>
              </motion.div>
            ))}
          </div>
          <div className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-rose-50 to-transparent" />
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-30">
        <div className="flex flex-col gap-3 rounded-3xl border border-rose-100 bg-white/90 px-4 py-3 shadow-xl backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex items-end gap-1">
              {[0, 1, 2].map((bar) => (
                <span
                  key={bar}
                  className={`h-4 w-1 rounded-full bg-rose-400 ${
                    isAudioPlaying && !isMuted ? 'animate-equalize' : ''
                  }`}
                  style={{
                    animationDelay: `${bar * 0.2}s`,
                  }}
                />
              ))}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
                {isAudioPlaying ? 'Now Playing' : 'Tap to play'}
              </p>
              <p className="text-sm font-medium text-slate-700">Valentine by Laufey</p>
            </div>
            <button
              onClick={onToggleMute}
              className="ml-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-50 text-rose-500 transition hover:bg-rose-100"
            >
              {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-rose-300">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.001"
              value={progress}
              onChange={(event) => onSeek?.(event.target.value)}
              className="h-1 w-48 cursor-pointer appearance-none rounded-full bg-rose-100 accent-rose-500"
            />
            <span className="text-xs text-rose-300">{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -right-10 top-10 hidden h-40 w-40 rounded-full bg-rose-200/40 blur-3xl md:block" />
      <div className="pointer-events-none absolute -left-10 bottom-20 hidden h-40 w-40 rounded-full bg-rose-100/60 blur-3xl md:block" />

      <div className="mt-12 flex items-center gap-2 text-sm text-rose-400">
        <Sparkles className="h-4 w-4" />
        <span>Every story deserves a soft soundtrack.</span>
      </div>

      <div className="mt-10 w-full rounded-[28px] border border-rose-100 bg-white/80 p-6 shadow-[0_25px_60px_-50px_rgba(244,63,94,0.35)] backdrop-blur">
        <h3 className="font-greatvibes text-3xl text-rose-500">What I know about you</h3>
        <p className="mt-2 max-w-2xl font-inter text-sm text-slate-600">
          Little notes I keep in my heart, translated with care.
        </p>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-rose-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Coffee</p>
            <p className="mt-2 text-sm text-slate-700">
              Loves choco-mint. Still likes coffee, but now needs less sugar and low caffeine.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Chicken</p>
            <p className="mt-2 text-sm text-slate-700">
              Only enjoys McD chicken. Says other places can taste fishy.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Sashimi</p>
            <p className="mt-2 text-sm text-slate-700">
              Might like sashimi.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Pear</p>
            <p className="mt-2 text-sm text-slate-700">
              Loves getting pears when she’s sick.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Food sensitivities</p>
            <p className="mt-2 text-sm text-slate-700">
              Can’t handle coconut milk, overly sweet, spicy, or too much caffeine.
            </p>
          </div>
          <div className="rounded-2xl bg-rose-50/70 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Queen of sleep</p>
            <p className="mt-2 text-sm text-slate-700">
              24/7 devotion to sleep. Absolute respect.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-rose-100 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Favorites</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Fish soup, grilled fish, chicken rice</li>
              <li>Chicken noodle with feet, hot chocolate</li>
              <li>Water, tamarind herbal drink</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-rose-100 bg-white p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Avoids</p>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>Sweet bottled coffee, soda</li>
              <li>Instant noodles, spicy, sour</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-rose-50/70 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Cup size</p>
          <p className="mt-2 text-sm text-slate-700">A cup, size 32.</p>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[24px] border border-rose-100 bg-white/80 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Our plan</p>
            <p className="mt-2 font-inter text-sm text-slate-600">
              Adventures we’re manifesting together.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-rose-50/70 p-3">
                <p className="text-sm font-semibold text-rose-500">Singapore — January 2027</p>
              </div>
              <div className="rounded-2xl bg-rose-50/70 p-3">
                <p className="text-sm font-semibold text-rose-500">SDUWHV, Australia — 2028</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-rose-300">
              <span className="rounded-full bg-rose-50 px-3 py-1">Maldives</span>
              <span className="rounded-full bg-rose-50 px-3 py-1">China</span>
              <span className="rounded-full bg-rose-50 px-3 py-1">Japan</span>
              <span className="rounded-full bg-rose-50 px-3 py-1">Thailand</span>
              <span className="rounded-full bg-rose-50 px-3 py-1">Malaysia</span>
              <span className="rounded-full bg-rose-50 px-3 py-1">Vietnam</span>
              <span className="rounded-full bg-rose-50 px-3 py-1">Switzerland</span>
            </div>
            <p className="mt-3 text-xs text-rose-300">(Years to be decided.)</p>
          </div>

          <div className="relative overflow-hidden rounded-[24px] border border-rose-100 bg-gradient-to-br from-rose-50 via-white to-rose-100 p-5 shadow-[0_25px_60px_-50px_rgba(244,63,94,0.35)]">
            <p className="text-xs uppercase tracking-[0.3em] text-rose-300">Mini map</p>
            <p className="mt-2 text-sm text-slate-600">Dream pins across our future trips.</p>
            <div className="mt-4 flex h-48 items-center justify-center">
              <svg
                viewBox="0 0 320 200"
                className="h-full w-full"
                aria-hidden="true"
              >
                <path
                  d="M20 120 C70 80, 140 140, 190 100 C230 70, 280 90, 300 60"
                  fill="none"
                  stroke="#fda4af"
                  strokeWidth="3"
                  strokeDasharray="6 10"
                />
                {[{ x: 60, y: 110 }, { x: 115, y: 95 }, { x: 170, y: 120 }, { x: 215, y: 80 }, { x: 270, y: 70 }].map(
                  (point, index) => (
                    <g key={index}>
                      <circle cx={point.x} cy={point.y} r="7" fill="#fb7185" opacity="0.8" />
                      <circle cx={point.x} cy={point.y} r="14" fill="#fecdd3" opacity="0.35" />
                    </g>
                  ),
                )}
              </svg>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[10px] uppercase tracking-[0.3em] text-rose-300">
              <span>Asia</span>
              <span>Europe</span>
              <span>Oceania</span>
              <span>Islands</span>
            </div>
            <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-rose-200/40 blur-2xl" />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={onAsk}
          className="group relative overflow-hidden rounded-full border border-rose-200 bg-white px-7 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400 shadow-sm transition hover:-translate-y-0.5 hover:scale-[1.02] hover:border-rose-300 hover:text-rose-500 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-200"
        >
          <span className="relative z-10">Ask the question</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-rose-100/60 via-rose-50/80 to-transparent transition duration-500 group-hover:translate-x-0" />
          <span className="pointer-events-none absolute -right-2 -top-2 h-6 w-6 rounded-full bg-rose-200/40 blur-md" />
          <span className="absolute -left-2 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-rose-300/70">
            <span className="absolute inset-0 rounded-full bg-rose-300/70 animate-ping" />
          </span>
        </button>
      </div>
    </div>
  )
}

export default Gallery
