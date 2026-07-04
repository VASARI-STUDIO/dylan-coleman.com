// Shop collection — one file per product.
//
// ┌─ To add a product ─────────────────────────────────────────────────┐
// │ 1. Copy an existing entry file in this folder (e.g. `uil4b.ts`).    │
// │ 2. Rename it, give it a new `id`, and fill in the fields.           │
// │ 3. Import it below and add it to SHOP (order = display order).      │
// └────────────────────────────────────────────────────────────────────┘

import type { ShopItem } from "./types";
import { uil4b } from "./uil4b";
import { adamAndEmily } from "./adam-and-emily";

export const SHOP: ShopItem[] = [uil4b, adamAndEmily];

/** Look up a product by its id. */
export function getShopItem(id: string): ShopItem | undefined {
  return SHOP.find((p) => p.id === id);
}

export type { ShopItem } from "./types";
