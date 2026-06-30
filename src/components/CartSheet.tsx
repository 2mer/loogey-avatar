import { X, ShoppingCart } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { useCart } from '@/hooks/useCart'

interface CartSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBuyGems: () => void
}

export function CartSheet({ open, onOpenChange, onBuyGems }: CartSheetProps) {
  const { items, totalPrice, remove } = useCart()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="size-4" />
            Cart
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 space-y-3 overflow-auto px-4">
          {items.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">
              Your cart is empty. Go buy something!
              <br />
              <span className="text-xs">(you can&apos;t, but go ahead and try)</span>
            </p>
          ) : (
            items.map((item) => (
              <div
                key={item.avatar.id}
                className="flex items-center gap-3 rounded-lg border border-border p-2"
              >
                <img
                  src={item.avatar.image}
                  alt={item.avatar.name}
                  className="size-12 rounded-md object-cover"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium">{item.avatar.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {item.quantity} × {item.avatar.price} 💎
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => remove(item.avatar.id)}
                >
                  <X className="size-3" />
                </Button>
              </div>
            ))
          )}
        </div>

        <SheetFooter>
          <div className="flex w-full flex-col gap-2">
            <div className="flex justify-between text-sm">
              <span>Total</span>
              <span className="font-display text-neon">{totalPrice} 💎</span>
            </div>
            <Button
              className="w-full"
              onClick={() => {
                onOpenChange(false)
                onBuyGems()
              }}
            >
              Checkout — 0 💎
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
