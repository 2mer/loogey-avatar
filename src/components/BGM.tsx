import { useEffect } from 'react'

export function BGM() {
  useEffect(() => {
    const audio = new Audio(`${import.meta.env.BASE_URL}sounds/bgm.mp3`)
    audio.loop = true
    audio.volume = 0.3
    audio.play().catch(() => {
      const resume = () => { audio.play(); document.removeEventListener('click', resume) }
      document.addEventListener('click', resume, { once: true })
    })
    return () => audio.pause()
  }, [])

  return null
}
