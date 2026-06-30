# LOOGIE — Avatar Store

A greenfield Vite + React + TS static site deployed to GitHub Pages. A fake avatar store with slime/snot/loogie theming where you can never actually buy anything.

## Checklist

### Setup

- [ ] Install dependencies: Tailwind v4, shadcn/ui, tsParticles, Framer Motion
- [ ] Configure Vite `base: '/loogey-avatar/'` for GitHub Pages
- [ ] Configure Tailwind v4 with custom theme (black bg, neon green `#39FF14` accent, display + sans fonts)
- [ ] Add `.github/workflows/deploy.yml` — build & deploy to GH Pages on push to main
- [ ] Remove Vite scaffold boilerplate (App.css, default assets, template content)

### Data Layer

- [ ] Create `src/data/avatars.ts` — static catalog of 6 avatars (loogey, bengvir, bb, xina, vance, robot) with id, name, image path, price, description
- [ ] Create `src/types.ts` — shared types (Avatar type, CartItem)

### State

- [ ] Create `src/hooks/useCart.ts` — React context + useReducer for cart (add, remove, clear, total)
- [ ] Wrap app in CartProvider

### Layout

- [ ] **Header** — "LOOGIE" brand text, Cart button with item count, Cosito Gem balance display (always 0)
- [ ] **Hero** — "LOOGIE" in large jittering/slimy animated display font
- [ ] **Gallery** — responsive grid of AvatarCards
- [ ] **Footer** — credits, links

### Components

- [ ] **AvatarCard** — image, name, price, "Add to Cart" button
- [ ] **CartSheet** — shadcn Sheet (sidebar from right). Shows cart items with quantity/remove. "Checkout" button always fails
- [ ] **CurrencyModal** — shadcn Dialog, reused for all 3 currencies:
  - Modal 1: "Buy Cosito Gems 💎" — priced in Funwaa Credits
  - Modal 2: "Buy Funwaa Credits" — priced in Labronium Ingots
  - Modal 3: "Buy Labronium Ingots 🪙" — priced in Cosito Gems (back to start)
  - Each "Buy" button opens the next modal in the loop; last one loops back to first
- [ ] **Tooltip** — shadcn Tooltip on avatar cards showing description

### Effects & Animation

- [ ] tsParticles background — floating slime bubbles/drips
- [ ] Custom CSS cursor trail — green slime blob follows cursor
- [ ] Framer Motion — entrance animations for gallery items on scroll
- [ ] Hero title jitter/slime animation
- [ ] Neon glow effects on headings and buttons

### Deployment

- [ ] GitHub Actions workflow to build and deploy
- [ ] Verify site works at `https://<user>.github.io/loogey-avatar/`
