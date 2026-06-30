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
import { GooeyCursor } from '@/components/GooeyCursor'
import { BGM } from '@/components/BGM'

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
          <Header
            onCartOpen={() => setCartOpen(true)}
            onBuyGems={() => setGemsModalOpen(true)}
          />
          <div style={{ filter: 'url(#displacement)' }}>
            <main className="pt-16">
              <Hero />
              <Gallery />
            </main>
            <Footer />
          </div>
          <CartSheet
            open={cartOpen}
            onOpenChange={setCartOpen}
            onBuyGems={() => setGemsModalOpen(true)}
          />
          <CurrencyModal
            open={gemsModalOpen}
            onOpenChange={setGemsModalOpen}
          />
          <GooeyCursor />
          <BGM />
        </ParticlesProvider>
      </CartProvider>
    </TooltipProvider>
  )
}

export default App
