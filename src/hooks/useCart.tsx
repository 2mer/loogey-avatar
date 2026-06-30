import {
  createContext,
  useContext,
  useReducer,
  type ReactNode,
} from 'react'
import type { Avatar, CartItem } from '@/types'

interface CartState {
  items: CartItem[]
}

type CartAction =
  | { type: 'ADD'; avatar: Avatar }
  | { type: 'REMOVE'; avatarId: string }
  | { type: 'CLEAR' }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const existing = state.items.find(
        (item) => item.avatar.id === action.avatar.id,
      )
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.avatar.id === action.avatar.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        }
      }
      return {
        items: [...state.items, { avatar: action.avatar, quantity: 1 }],
      }
    }
    case 'REMOVE':
      return {
        items: state.items.filter((item) => item.avatar.id !== action.avatarId),
      }
    case 'CLEAR':
      return { items: [] }
    default:
      return state
  }
}

interface CartContextValue {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  add: (avatar: Avatar) => void
  remove: (avatarId: string) => void
  clear: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  const value: CartContextValue = {
    items: state.items,
    totalItems: state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: state.items.reduce(
      (sum, item) => sum + item.avatar.price * item.quantity,
      0,
    ),
    add: (avatar: Avatar) => dispatch({ type: 'ADD', avatar }),
    remove: (avatarId: string) => dispatch({ type: 'REMOVE', avatarId }),
    clear: () => dispatch({ type: 'CLEAR' }),
  }

  return <CartContext value={value}>{children}</CartContext>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}
