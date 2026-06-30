import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Gem, CreditCard, Pickaxe } from 'lucide-react'

interface Tier {
  currency: string
  symbol: string
  amount: number
  cost: number
  costCurrency: string
  costSymbol: string
}

interface CurrencyState {
  title: string
  description: string
  icon: typeof Gem
  tiers: Tier[]
  next: 'gems' | 'credits' | 'ingots' | null
}

const STATES: Record<string, CurrencyState> = {
  gems: {
    title: 'Buy Cosito Gems',
    description: 'You need more Gems to complete your purchase.',
    icon: Gem,
    tiers: [
      { currency: 'Cosito Gems', symbol: '💎', amount: 10, cost: 0.99, costCurrency: 'Funwaa Credits', costSymbol: '🪪' },
      { currency: 'Cosito Gems', symbol: '💎', amount: 50, cost: 2.99, costCurrency: 'Funwaa Credits', costSymbol: '🪪' },
      { currency: 'Cosito Gems', symbol: '💎', amount: 100, cost: 4.99, costCurrency: 'Funwaa Credits', costSymbol: '🪪' },
    ],
    next: 'credits',
  },
  credits: {
    title: 'Buy Funwaa Credits',
    description: 'You need Funwaa Credits to buy Cosito Gems.',
    icon: CreditCard,
    tiers: [
      { currency: 'Funwaa Credits', symbol: '🪪', amount: 10, cost: 0.99, costCurrency: 'Labronium Ingots', costSymbol: '🪙' },
      { currency: 'Funwaa Credits', symbol: '🪪', amount: 50, cost: 2.99, costCurrency: 'Labronium Ingots', costSymbol: '🪙' },
      { currency: 'Funwaa Credits', symbol: '🪪', amount: 100, cost: 4.99, costCurrency: 'Labronium Ingots', costSymbol: '🪙' },
    ],
    next: 'ingots',
  },
  ingots: {
    title: 'Buy Labronium Ingots',
    description: 'You need Labronium Ingots to buy Funwaa Credits.',
    icon: Pickaxe,
    tiers: [
      { currency: 'Labronium Ingots', symbol: '🪙', amount: 10, cost: 0.99, costCurrency: 'Cosito Gems', costSymbol: '💎' },
      { currency: 'Labronium Ingots', symbol: '🪙', amount: 50, cost: 2.99, costCurrency: 'Cosito Gems', costSymbol: '💎' },
      { currency: 'Labronium Ingots', symbol: '🪙', amount: 100, cost: 4.99, costCurrency: 'Cosito Gems', costSymbol: '💎' },
    ],
    next: 'gems',
  },
}

interface CurrencyModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CurrencyModal({ open, onOpenChange }: CurrencyModalProps) {
  const [state, setState] = useState<CurrencyState>(STATES.gems)
  const Icon = state.icon

  function handleBuy() {
    if (state.next) {
      setState(STATES[state.next])
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) setState(STATES.gems)
        onOpenChange(next)
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="size-5 text-neon" />
            {state.title}
          </DialogTitle>
          <DialogDescription>{state.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2">
          {state.tiers.map((tier, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg border border-border p-3"
            >
              <div>
                <span className="font-display text-sm">
                  {tier.amount} {tier.symbol}
                </span>
                <p className="text-xs text-muted-foreground">
                  {tier.cost} {tier.costSymbol} — {tier.costCurrency}
                </p>
              </div>
              <Button size="sm" onClick={handleBuy}>
                Buy
              </Button>
            </div>
          ))}
        </div>

        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>
  )
}
