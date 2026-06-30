import { avatars } from '@/data/avatars'
import { AvatarCard } from './AvatarCard'

export function Gallery() {
  return (
    <section className="mx-auto grid w-full max-w-5xl grid-cols-2 gap-4 px-4 pb-16 sm:grid-cols-3 lg:grid-cols-4">
      {avatars.map((avatar, i) => (
        <AvatarCard key={avatar.id} avatar={avatar} index={i} />
      ))}
    </section>
  )
}
