// ═══════════════════════════════════════════════════════════════════
// CART TYPES
// Types for the shopping cart API
// ═══════════════════════════════════════════════════════════════════

/**
 * A single item in the cart
 */
export interface CartItem {
  passId: string;
  quantity: number;
}

/**
 * Cart response from API (flat structure)
 */
export interface CartApiResponse {
  info: string;
  items: CartItem[];
  totalQuantity: number;
}

/**
 * Add to cart request body
 */
export interface AddToCartRequest {
  passId: string;
  quantity: number;
}

/**
 * Remove from cart request body
 */
export interface RemoveFromCartRequest {
  passId: string;
}

/**
 * Cart item with pass details (enriched client-side)
 */
export interface CartItemWithDetails extends CartItem {
  name: string;
  price: number;
  image: string;
  tagline: string;
  accentColor: string;
}
