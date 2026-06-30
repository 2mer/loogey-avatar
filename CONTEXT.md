# LOOGIE — Domain Glossary

The brand/site name is **LOOGIE** (short for Loogey Avatar).

## Tech Stack
- **Build**: Vite 8 + React 19 + TypeScript 6
- **Styling**: Tailwind v4
- **UI Components**: shadcn/ui (Dialog, Sheet, Tooltip, Button)
- **Animations/Effects**: tsParticles (background particles), Framer Motion (animations), custom CSS cursor trail

## Visual Identity
- Dark mode: black background, neon green (#39FF14) as primary accent
- Slime/snot/loogie theme: green-dominant palette with translucent/gooey aesthetics
- Playful display font for headings, clean sans (Inter) for body
- Neon glow effects and glassmorphism accents

## Avatar
A purchasable portrait image in the store. Has a name, image path, price, and description.

## Cosito Gem
The primary fake currency used to "buy" avatars. Displayed with a 💎 gemstone emoji. Priced in Funwaa Credits in the "Buy Gems" modal.

## Funwaa Credit
A secondary fake currency used to buy Cosito Gems. Priced in Labronium Ingots in the "Buy Funwaa Credits" modal.

## Labronium Ingot
A tertiary fake currency used to buy Funwaa Credits. Priced in Cosito Gems in the "Buy Labronium Ingots" modal, forming a circular currency loop.

## Cart
A transient list of avatars the user has added for "purchase". No restriction on what can be added. Checkout always fails (user has 0 Gems) and triggers the currency-purchase modal chain.

## Store
A fake storefront — no real payments, no authentication, no backend. The "buy" interaction is purely cosmetic/playful. User starts with 0 Cosito Gems and cannot complete any purchase. Avatars are never "owned" — there is no ownership state.
