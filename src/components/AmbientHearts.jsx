import { useMemo } from 'react'

const AmbientHearts = () => {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => {
        const left = 6 + index * 7
        const size = 14 + (index % 5) * 4
        const duration = 10 + (index % 6) * 2
        const delay = (index % 4) * -2
        return { id: index, left, size, duration, delay }
      }),
    [],
  )

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <span
          key={heart.id}
          className="ambient-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  )
}

export default AmbientHearts
