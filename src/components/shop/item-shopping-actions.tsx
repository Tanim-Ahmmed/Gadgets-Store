"use client";

import { useEffect, useState } from "react";

import { useShopping } from "@/context/shopping-context";
import { buttonVariants } from "@/components/ui/button";
import { Toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import {
  BoltIcon,
  CartIcon,
  HeartIcon,
} from "@/components/shop/shopping-icons";

type ItemShoppingActionsProps = {
  itemId: string;
  layout?: "card" | "detail";
};

export function ItemShoppingActions({
  itemId,
  layout = "card",
}: ItemShoppingActionsProps) {
  const { addToCart, isInWishlist, mounted, toggleWishlist } = useShopping();
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (!showToast) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setShowToast(false);
    }, 2200);

    return () => window.clearTimeout(timeoutId);
  }, [showToast]);

  function openToast(message: string) {
    setToastMessage(message);
    setShowToast(true);
  }

  function handleWishlistToggle() {
    const nextIsSaved = toggleWishlist(itemId);
    openToast(nextIsSaved ? "Added to wishlist" : "Removed from wishlist");
  }

  function handleAddToCart() {
    addToCart(itemId);
    openToast("Added to cart");
  }

  function handleBuyNow() {
    openToast("Checkout coming soon");
  }

  const isWishlisted = mounted && isInWishlist(itemId);

  return (
    <>
      <Toast visible={showToast}>
        <p className="font-medium text-white">{toastMessage}</p>
      </Toast>

      <div
        className={cn(
          "flex gap-3",
          layout === "detail" ? "flex-col sm:flex-row" : "flex-col",
        )}
      >
        <button
          type="button"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlisted}
          className={cn(
            "inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium shadow-md transition-all duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            isWishlisted
              ? "border-rose-400/40 bg-rose-500/12 text-rose-200 hover:bg-rose-500/18"
              : "border-white/10 bg-card text-slate-200 hover:border-rose-300/30 hover:bg-[#17133a] hover:text-white",
            layout === "detail" ? "sm:min-w-44" : "w-full",
          )}
          onClick={handleWishlistToggle}
        >
          <HeartIcon
            className={cn(
              "transition duration-200",
              isWishlisted && "fill-current text-rose-300",
            )}
          />
          {isWishlisted ? "Wishlisted" : "Save"}
        </button>

        <button
          type="button"
          className={cn(
            buttonVariants("outline", "gap-2"),
            layout === "detail" ? "sm:min-w-44" : "w-full",
          )}
          onClick={handleAddToCart}
        >
          <CartIcon />
          Add to Cart
        </button>

        <button
          type="button"
          className={cn(
            buttonVariants("primary", "gap-2"),
            layout === "detail" ? "sm:min-w-44" : "w-full",
          )}
          onClick={handleBuyNow}
        >
          <BoltIcon />
          Buy Now
        </button>
      </div>
    </>
  );
}
