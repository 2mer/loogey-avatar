import { useCallback, useState } from 'react'
import { ParticlesProvider, ParticlesBackground } from '@/components/ParticlesBackground'
import { loadSlim } from '@tsparticles/slim'
import type { Engine } from '@tsparticles/engine'
import { CartProvider } from '@/hooks/useCart'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Gallery } from '@/components/Gallery'
import { Footer } from '@/components/Footer'
import { CartSheet } from '@/components/CartSheet'
import { CurrencyModal } from '@/components/CurrencyModal'
import { CursorTrail } from '@/components/CursorTrail'

function App() {
  const [cartOpen, setCartOpen] = useState(false)
  const [gemsModalOpen, setGemsModalOpen] = useState(false)

  const initParticles = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <TooltipProvider>
      <CartProvider>
        <ParticlesProvider init={initParticles}>
          <ParticlesBackground />
          <CursorTrail />
          <Header
            onCartOpen={() => setCartOpen(true)}
            onBuyGems={() => setGemsModalOpen(true)}
          />
          <main className="pt-16">
            <Hero />
            <Gallery />
          </main>
          <Footer />
          <CartSheet
            open={cartOpen}
            onOpenChange={setCartOpen}
            onBuyGems={() => setGemsModalOpen(true)}
          />
          <CurrencyModal
            open={gemsModalOpen}
            onOpenChange={setGemsModalOpen}
          />
        </ParticlesProvider>
      </CartProvider>
    </TooltipProvider>
  )
}

export default App
