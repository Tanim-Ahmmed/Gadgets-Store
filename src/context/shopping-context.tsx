"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { useHasMounted } from "@/hooks/use-has-mounted";
import {
  readCart,
  readWishlist,
  writeCart,
  writeWishlist,
  type CartItem,
} from "@/lib/guest-shopping";

type ShoppingContextValue = {
  cart: CartItem[];
  cartCount: number;
  mounted: boolean;
  wishlist: string[];
  wishlistCount: number;
  addToCart: (id: string) => void;
  decreaseCartQty: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  removeFromCart: (id: string) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (id: string) => boolean;
};

const ShoppingContext = createContext<ShoppingContextValue | undefined>(
  undefined,
);

export function ShoppingProvider({ children }: { children: ReactNode }) {
  const mounted = useHasMounted();
  const [wishlist, setWishlist] = useState<string[]>(() => readWishlist());
  const [cart, setCart] = useState<CartItem[]>(() => readCart());

  const value = useMemo<ShoppingContextValue>(() => {
    const wishlistCount = wishlist.length;
    const cartCount = cart.reduce((total, item) => total + item.qty, 0);

    function toggleWishlist(id: string) {
      let nextIsInWishlist = false;

      setWishlist((currentWishlist) => {
        const alreadySaved = currentWishlist.includes(id);
        const nextWishlist = alreadySaved
          ? currentWishlist.filter((itemId) => itemId !== id)
          : [...currentWishlist, id];

        nextIsInWishlist = !alreadySaved;
        writeWishlist(nextWishlist);
        return nextWishlist;
      });

      return nextIsInWishlist;
    }

    function addToCart(id: string) {
      setCart((currentCart) => {
        const existingItem = currentCart.find((item) => item.id === id);
        const nextCart = existingItem
          ? currentCart.map((item) =>
              item.id === id ? { ...item, qty: item.qty + 1 } : item,
            )
          : [...currentCart, { id, qty: 1 }];

        writeCart(nextCart);
        return nextCart;
      });
    }

    function decreaseCartQty(id: string) {
      setCart((currentCart) => {
        const nextCart = currentCart
          .map((item) =>
            item.id === id ? { ...item, qty: item.qty - 1 } : item,
          )
          .filter((item) => item.qty > 0);

        writeCart(nextCart);
        return nextCart;
      });
    }

    function removeFromCart(id: string) {
      setCart((currentCart) => {
        const nextCart = currentCart.filter((item) => item.id !== id);
        writeCart(nextCart);
        return nextCart;
      });
    }

    function removeFromWishlist(id: string) {
      setWishlist((currentWishlist) => {
        const nextWishlist = currentWishlist.filter((itemId) => itemId !== id);
        writeWishlist(nextWishlist);
        return nextWishlist;
      });
    }

    return {
      cart,
      cartCount,
      mounted,
      wishlist,
      wishlistCount,
      addToCart,
      decreaseCartQty,
      isInWishlist: (id: string) => wishlist.includes(id),
      removeFromCart,
      removeFromWishlist,
      toggleWishlist,
    };
  }, [cart, mounted, wishlist]);

  return (
    <ShoppingContext.Provider value={value}>
      {children}
    </ShoppingContext.Provider>
  );
}

export function useShopping() {
  const context = useContext(ShoppingContext);

  if (!context) {
    throw new Error("useShopping must be used within a ShoppingProvider.");
  }

  return context;
}
