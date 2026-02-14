export interface ProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  features: string[];
  variants: ProductVariant[];
}

export const productsData: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Unripe Plantain 💚",
    slug: "unripe-plantain",
    price: 7000,
    image: "/Bunchofunripeplantain.jpg",
    images: ["/Bunchofunripeplantain.jpg"],
    category: "Fruits & Vegetables",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description:
      "Fresh unripe plantain straight from the farm! Perfect for diabetics and healthy eating. Great for boiling, frying, or making plantain porridge. Rich in fiber and essential nutrients.",
    features: [
      "Full bunch of premium unripe plantain",
      "Harvested within 24 hours",
      "Perfect for diabetic-friendly meals",
      "Rich in fiber and vitamins",
      "Great for weight management",
    ],
    variants: [
      { id: "small", name: "Small Bunch", price: 5000, stock: 15 },
      { id: "medium", name: "Medium Bunch", price: 7000, stock: 20 },
      { id: "large", name: "Large Bunch", price: 9000, stock: 10 },
    ],
  },
  "2": {
    id: "2",
    name: "Ripe Plantain 🍌",
    slug: "ripe-plantain",
    price: 11000,
    image: "/Bunchofrippedplantain.jpg",
    images: ["/Bunchofrippedplantain.jpg"],
    category: "Fruits & Vegetables",
    rating: 4.9,
    reviews: 247,
    inStock: true,
    description:
      "Sweet, ripe plantain perfect for frying! Our plantains are naturally ripened to perfection. Perfect for making delicious fried plantain (dodo), plantain chips, or sweet plantain porridge.",
    features: [
      "Full bunch of naturally ripened plantain",
      "Perfect sweetness for frying",
      "Farm fresh - delivered same day",
      "Rich in potassium and energy",
      "Great for breakfast or snacks",
    ],
    variants: [
      { id: "small", name: "Small Bunch", price: 8000, stock: 12 },
      { id: "medium", name: "Medium Bunch", price: 11000, stock: 18 },
      { id: "large", name: "Large Bunch", price: 14000, stock: 8 },
    ],
  },
  "3": {
    id: "3",
    name: "Farm Fresh Eggs 🥚",
    slug: "farm-fresh-eggs",
    price: 7000,
    image: "/Crateofeggs.jpg",
    images: ["/Crateofeggs.jpg"],
    category: "Protein",
    rating: 5.0,
    reviews: 189,
    inStock: true,
    description:
      "Premium farm-fresh eggs from free-range chickens! Our eggs are collected daily and delivered fresh to your door. Large, healthy eggs perfect for all your cooking needs.",
    features: [
      "Crate of 30 large eggs",
      "From free-range chickens",
      "Collected daily for maximum freshness",
      "High protein, rich in vitamins",
      "Perfect for all cooking & baking",
    ],
    variants: [
      { id: "half", name: "Half Crate (15 eggs)", price: 3500, stock: 25 },
      { id: "full", name: "Full Crate (30 eggs)", price: 7000, stock: 30 },
    ],
  },
  "4": {
    id: "4",
    name: "Pure Palm Oil 🔴",
    slug: "pure-palm-oil",
    price: 1500,
    image: "/Aliterofpalmoilgoes.jpg",
    images: ["/Aliterofpalmoilgoes.jpg"],
    category: "Provisions",
    rating: 5.0,
    reviews: 221,
    inStock: true,
    description:
      "100% pure red palm oil - liquid gold for your kitchen! Freshly extracted from premium palm fruits. Rich in vitamins and perfect for authentic Nigerian dishes.",
    features: [
      "1 liter of pure palm oil",
      "No additives or preservatives",
      "Rich red color - high quality",
      "Perfect for soups and stews",
      "Rich in Vitamin A and E",
    ],
    variants: [
      { id: "500ml", name: "500ml Bottle", price: 800, stock: 40 },
      { id: "1liter", name: "1 Liter Bottle", price: 1500, stock: 35 },
      { id: "2liter", name: "2 Liters", price: 2800, stock: 20 },
    ],
  },
  "5": {
    id: "5",
    name: "Premium Garri ⚪",
    slug: "premium-garri",
    price: 2500,
    image: "/Garri.jpg",
    images: ["/Garri.jpg"],
    category: "Staples",
    rating: 4.9,
    reviews: 298,
    inStock: true,
    description:
      "Premium white garri - the Nigerian staple! Carefully processed from fresh cassava. Fine texture, perfect for drinking or making eba. Stone-free and hygienically packaged.",
    features: [
      "5kg bag of premium white garri",
      "Fine, smooth texture",
      "100% stone-free guarantee",
      "Perfect for eba or drinking",
      "Hygienically processed & packaged",
    ],
    variants: [
      { id: "2kg", name: "2kg Pack", price: 1200, stock: 30 },
      { id: "5kg", name: "5kg Pack", price: 2500, stock: 25 },
      { id: "10kg", name: "10kg Pack", price: 4800, stock: 15 },
    ],
  },
  "6": {
    id: "6",
    name: "Local Rice 🍚",
    slug: "local-rice",
    price: 4500,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=90",
    images: ["https://images.unsplash.com/photo-1586201375761-83865001e31c?w=1200&q=90"],
    category: "Staples",
    rating: 4.8,
    reviews: 156,
    inStock: true,
    description:
      "Premium Nigerian local rice! 100% stone-free, thoroughly cleaned and ready to cook. Perfect grains that cook evenly and taste amazing. Support local farmers!",
    features: [
      "5kg of premium local rice",
      "100% stone-free guarantee",
      "Thoroughly cleaned & sorted",
      "Perfect grain quality",
      "Supports Nigerian farmers",
    ],
    variants: [
      { id: "2kg", name: "2kg Pack", price: 2000, stock: 35 },
      { id: "5kg", name: "5kg Pack", price: 4500, stock: 28 },
      { id: "10kg", name: "10kg Pack", price: 8500, stock: 18 },
    ],
  },
  "7": {
    id: "7",
    name: "Live Chicken 🐔",
    slug: "live-chicken",
    price: 15000,
    image: "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=90",
    images: ["https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=1200&q=90"],
    category: "Protein",
    rating: 5.0,
    reviews: 203,
    inStock: true,
    description:
      "Fresh, healthy live chicken from our trusted farms! Big, healthy birds raised with care. Perfect for special occasions, parties, or family meals. Delivered live or dressed to your preference.",
    features: [
      "Big, healthy chicken (2.5-3kg)",
      "Farm-raised with natural feed",
      "Delivered fresh same day",
      "Live or dressed - your choice",
      "Perfect for parties & celebrations",
    ],
    variants: [
      { id: "small", name: "Small (1.5-2kg)", price: 10000, stock: 12 },
      { id: "medium", name: "Medium (2-2.5kg)", price: 13000, stock: 15 },
      { id: "large", name: "Large (2.5-3kg)", price: 15000, stock: 10 },
    ],
  },
};

// Helper function to get a single product
export function getProduct(id: string): Product | undefined {
  return productsData[id];
}

// Helper function to get all products as array
export function getAllProducts(): Product[] {
  return Object.values(productsData);
}
