import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCart } from '@/hooks/useCart'
import type { Avatar } from '@/types'
import { motion } from 'framer-motion'

interface AvatarCardProps {
  avatar: Avatar
  index: number
}

export function AvatarCard({ avatar, index }: AvatarCardProps) {
  const { add } = useCart()

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group relative flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:border-neon/40"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <img
            src={avatar.image}
            alt={avatar.name}
            className="aspect-square w-full rounded-lg object-cover"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p>{avatar.description}</p>
        </TooltipContent>
      </Tooltip>

      <div className="flex w-full items-center justify-between">
        <div>
          <h3 className="font-display text-sm text-foreground">{avatar.name}</h3>
          <p className="text-xs text-muted-foreground">{avatar.price} 💎</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => add(avatar)}
          className="opacity-0 transition-opacity group-hover:opacity-100"
        >
          <ShoppingCart className="size-3.5" />
        </Button>
      </div>
    </motion.div>
  )
}
