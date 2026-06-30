import { useEffect, useState } from 'react'

export function Hero() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const jitter = (Math.random() - 0.5) * 3
        return prev + jitter
      })
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative flex min-h-[60vh] flex-col items-center justify-center overflow-hidden pt-16">
      <div className="relative">
        <h1
          className="font-display text-[clamp(4rem,15vw,10rem)] leading-none text-neon select-none"
          style={{
            filter: `url(#glow) drop-shadow(0 0 30px #39FF14)`,
            transform: `translate(${offset * 0.3}px, ${offset * 0.2}px)`,
          }}
        >
          LOOGIE
        </h1>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          We make loogies
        </p>
      </div>

      <svg className="absolute size-0">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </section>
  )
}
