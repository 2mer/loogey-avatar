import { useEffect, useState, useRef } from 'react'
import { createPortal } from 'react-dom'

interface Blob {
  id: number
  x: number
  y: number
  life: number
}

interface Orbital {
  radius: number
  x: number
  y: number
  vx: number
  vy: number
}

const TRAIL_SIZE = 36
const CURSOR = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
let CURSOR_ACTIVE = false
const STIFFNESS = 0.06
const DAMPING = 0.85

const ORBITALS: Orbital[] = Array.from({ length: 5 }, (_, i) => {
  const a = (Math.PI * 2 * i) / 5
  return {
    radius: 18 + i * 3,
    x: CURSOR.x + Math.cos(a) * 80,
    y: CURSOR.y + Math.sin(a) * 80,
    vx: Math.cos(a + Math.PI / 2) * 2,
    vy: Math.sin(a + Math.PI / 2) * 2,
  }
})

export function GooeyCursor() {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const [orbitals, setOrbitals] = useState<Orbital[]>(() =>
    ORBITALS.map((o) => ({ ...o })),
  )
  const idRef = useRef(0)

  useEffect(() => {
    function onMove(e: MouseEvent) {
      CURSOR.x = e.clientX
      CURSOR.y = e.clientY
      CURSOR_ACTIVE = true
      const id = idRef.current++
      setBlobs((prev) => [
        ...prev.slice(-8),
        { id, x: e.clientX, y: e.clientY, life: 1 },
      ])
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    function tick() {
      setBlobs((prev) =>
        prev
          .map((b) => ({ ...b, life: b.life - 0.04 }))
          .filter((b) => b.life > 0),
      )

      if (!CURSOR_ACTIVE) return

      setOrbitals((prev) => {
        const reps = prev.map(() => ({ fx: 0, fy: 0 }))
        for (let i = 0; i < prev.length; i++) {
          for (let j = i + 1; j < prev.length; j++) {
            const a = prev[i]
            const b = prev[j]
            const dx = a.x - b.x
            const dy = a.y - b.y
            const dist = Math.sqrt(dx * dx + dy * dy)
            if (dist < 1) continue
            const minDist = a.radius + b.radius + 10
            if (dist >= minDist * 2) continue
            const force = ((minDist * 2 - dist) / minDist) * 0.15
            const nx = dx / dist
            const ny = dy / dist
            reps[i].fx += nx * force
            reps[i].fy += ny * force
            reps[j].fx -= nx * force
            reps[j].fy -= ny * force
          }
        }

        return prev.map((o, i) => {
          const dx = CURSOR.x - o.x
          const dy = CURSOR.y - o.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          let fx = reps[i].fx
          let fy = reps[i].fy
          if (dist > 0) {
            const pull = Math.min(dist, 200) * STIFFNESS
            fx += (dx / dist) * pull
            fy += (dy / dist) * pull
          }

          let vx = (o.vx + fx) * DAMPING
          let vy = (o.vy + fy) * DAMPING

          const speed = Math.sqrt(vx * vx + vy * vy)
          const MIN_SPEED = 3
          if (speed < MIN_SPEED) {
            if (speed > 0.001) {
              const scale = MIN_SPEED / speed
              vx *= scale
              vy *= scale
            } else {
              const a = Math.random() * Math.PI * 2
              vx = Math.cos(a) * MIN_SPEED
              vy = Math.sin(a) * MIN_SPEED
            }
          }

          return { ...o, x: o.x + vx, y: o.y + vy, vx, vy }
        })
      })
    }

    const timer = setInterval(tick, 50)
    return () => clearInterval(timer)
  }, [])

  return createPortal(
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" result="merged" />
            <feDropShadow in="merged" dx="0" dy="0" stdDeviation="10" flood-color="#39FF14" flood-opacity="0.7" />
          </filter>
        </defs>
      </svg>
      <div
        className="pointer-events-none fixed inset-0 z-50"
        style={{ filter: 'url(#goo)' }}
      >
        {orbitals.map((o, i) => (
          <div
            key={`o-${i}`}
            className="absolute rounded-full"
            style={{
              left: o.x - o.radius,
              top: o.y - o.radius,
              width: o.radius * 2,
              height: o.radius * 2,
              background: 'rgba(57,255,20,0.7)',
              borderRadius: '50%',
            }}
          />
        ))}
        {blobs.map((b) => (
          <div
            key={b.id}
            className="absolute rounded-full"
            style={{
              left: b.x - TRAIL_SIZE / 2,
              top: b.y - TRAIL_SIZE / 2,
              width: TRAIL_SIZE,
              height: TRAIL_SIZE,
              background: 'rgba(57,255,20,0.8)',
              opacity: b.life,
              borderRadius: '50%',
              transform: `scale(${0.6 + b.life * 0.4})`,
              transition: 'opacity 0.05s, transform 0.05s',
            }}
          />
        ))}
      </div>
    </>,
    document.body,
  )
}
