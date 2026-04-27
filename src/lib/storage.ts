import gadgetsData from "@/data/gadgets.json";
import type { Gadget, NewGadget } from "@/types/gadget";

const STORAGE_KEY = "gadget-store-items";

const seedItems = gadgetsData as Gadget[];

function isBrowser() {
  return typeof window !== "undefined";
}

function readStorage(): Gadget[] | null {
  if (!isBrowser()) {
    return null;
  }

  const storedValue = window.localStorage.getItem(STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as Gadget[];
  } catch {
    return null;
  }
}

function writeStorage(items: Gadget[]) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function getItems(): Gadget[] {
  const storedItems = readStorage();

  if (storedItems && storedItems.length > 0) {
    return storedItems;
  }

  if (isBrowser() && !storedItems) {
    writeStorage(seedItems);
  }

  return seedItems;
}

export function addItem(item: NewGadget): Gadget[] {
  const nextItem: Gadget = {
    ...item,
    id: item.id ?? crypto.randomUUID(),
    createdAt: item.createdAt ?? new Date().toISOString(),
  };

  const items = [...getItems(), nextItem];
  writeStorage(items);
  return items;
}

export function deleteItem(id: string): Gadget[] {
  const items = getItems().filter((item) => item.id !== id);
  writeStorage(items);
  return items;
}
