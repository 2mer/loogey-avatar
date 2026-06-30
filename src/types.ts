export interface Avatar {
  id: string
  name: string
  image: string
  price: number
  description: string
}

export interface CartItem {
  avatar: Avatar
  quantity: number
}
