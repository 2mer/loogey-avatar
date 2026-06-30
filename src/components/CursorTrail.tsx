import { useEffect, useState, useRef } from 'react'

interface Blob {
  id: number
  x: number
  y: number
  life: number
}

export function CursorTrail() {
  const [blobs, setBlobs] = useState<Blob[]>([])
  const idRef = useRef(0)
  const hasBlobs = blobs.length > 0

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const id = idRef.current++
      setBlobs((prev) => [
        ...prev.slice(-15),
        { id, x: e.clientX, y: e.clientY, life: 1 },
      ])
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useEffect(() => {
    if (!hasBlobs) return
    const timer = setInterval(() => {
      setBlobs((prev) => {
        const next = prev
          .map((b) => ({ ...b, life: b.life - 0.05 }))
          .filter((b) => b.life > 0)
        return next
      })
    }, 50)
    return () => clearInterval(timer)
  }, [hasBlobs])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {blobs.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full bg-neon/20 blur-sm"
          style={{
            left: b.x - 6,
            top: b.y - 6,
            width: 12,
            height: 12,
            opacity: b.life,
            transform: `scale(${1 + (1 - b.life) * 2})`,
            transition: 'opacity 0.05s, transform 0.05s',
          }}
        />
      ))}
    </div>
  )
}
