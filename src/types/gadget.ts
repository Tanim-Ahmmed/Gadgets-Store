export type Gadget = {
  id: string;
  title: string;
  category: string;
  price: number;
  rating: number;
  brand: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  createdAt: string;
};

export type NewGadget = Omit<Gadget, "id" | "createdAt"> & {
  id?: string;
  createdAt?: string;
};
