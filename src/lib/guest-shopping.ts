export type CartItem = {
  id: string;
  qty: number;
};

export const WISHLIST_STORAGE_KEY = "gadget-store-wishlist";
export const CART_STORAGE_KEY = "gadget-store-cart";

function isBrowser() {
  return typeof window !== "undefined";
}

function parseJson<T>(value: string | null, fallback: T): T {
  if (!value) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

export function readWishlist(): string[] {
  if (!isBrowser()) {
    return [];
  }

  const wishlist = parseJson<string[]>(
    window.localStorage.getItem(WISHLIST_STORAGE_KEY),
    [],
  );

  return Array.isArray(wishlist)
    ? wishlist.filter((itemId): itemId is string => typeof itemId === "string")
    : [];
}

export function writeWishlist(wishlist: string[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(
    WISHLIST_STORAGE_KEY,
    JSON.stringify([...new Set(wishlist)]),
  );
}

export function readCart(): CartItem[] {
  if (!isBrowser()) {
    return [];
  }

  const cart = parseJson<CartItem[]>(
    window.localStorage.getItem(CART_STORAGE_KEY),
    [],
  );

  if (!Array.isArray(cart)) {
    return [];
  }

  return cart.filter(
    (item): item is CartItem =>
      typeof item?.id === "string" &&
      typeof item?.qty === "number" &&
      Number.isFinite(item.qty) &&
      item.qty > 0,
  );
}

export function writeCart(cart: CartItem[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
}
