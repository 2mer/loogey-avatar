import { ShoppingCart, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'

interface HeaderProps {
  onCartOpen: () => void
  onBuyGems: () => void
}

export function Header({ onCartOpen, onBuyGems }: HeaderProps) {
  const { totalItems } = useCart()

  return (
    <header className="fixed top-0 right-0 left-0 z-40 flex items-center justify-between border-b border-border bg-background/80 px-6 py-3 backdrop-blur-md">
      <span className="font-display text-2xl tracking-wide text-neon drop-shadow-[0_0_8px_#39FF14]">
        LOOGIE
      </span>
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={onBuyGems}>
          <Gem className="size-4 text-cyan-400" />
          <span>0 💎</span>
        </Button>
        <Button variant="outline" size="sm" onClick={onCartOpen} className="relative">
          <ShoppingCart className="size-4" />
          {totalItems > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-full bg-neon text-[10px] font-bold text-black">
              {totalItems}
            </span>
          )}
        </Button>
      </div>
    </header>
  )
}
