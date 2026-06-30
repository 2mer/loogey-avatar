import { Particles, ParticlesProvider } from '@tsparticles/react'
import type { ISourceOptions } from '@tsparticles/engine'

export { ParticlesProvider }

const options: ISourceOptions = {
  fpsLimit: 60,
  fullScreen: false,
  particles: {
    number: {
      value: 30,
      density: { enable: true },
    },
    color: { value: '#39FF14' },
    shape: { type: 'circle' },
    opacity: {
      value: { min: 0.1, max: 0.4 },
      animation: {
        enable: true,
        speed: 1,
        sync: false,
      },
    },
    size: {
      value: { min: 2, max: 6 },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: 'top',
      outModes: { default: 'out' },
    },
  },
  detectRetina: true,
}

export function ParticlesBackground() {
  return (
    <Particles
      id="bg-particles"
      className="fixed inset-0 -z-10"
      options={options}
    />
  )
}
