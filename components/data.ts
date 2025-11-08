export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
}

export interface CartItem extends Product {
  quantity: number
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Minimal Desk Lamp",
    description: "A sleek and modern desk lamp with adjustable brightness and color temperature.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Lighting",
  },
  {
    id: "p2",
    name: "Ceramic Coffee Set",
    description: "Handcrafted ceramic coffee set including 4 cups and a matching pour-over dripper.",
    price: 15,
    image:
      "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Kitchenware",
  },
  {
    id: "p3",
    name: "Linen Throw Pillow",
    description: "Soft linen throw pillow with minimalist pattern design.",
    price: 10,
    image:
      "https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Home Decor",
  },
  {
    id: "p4",
    name: "Wooden Wall Clock",
    description: "Modern wooden wall clock with silent movement.",
    price: 1,
    image:
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Home Decor",
  },
  {
    id: "p5",
    name: "Concrete Planter",
    description: "Minimalist concrete planter perfect for succulents.",
    price: 0.001,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Plants",
  },
  {
    id: "p6",
    name: "Glass Vase Set",
    description: "Set of 3 minimalist glass vases in varying sizes.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Home Decor",
  },
  {
    id: "p7",
    name: "Bamboo Organizer",
    description: "Desk organizer made from sustainable bamboo.",
    price: 13,
    image:
      "https://images.unsplash.com/photo-1591129841117-3adfd313e34f?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Office",
  },
  {
    id: "p9",
    name: "Marble Coasters",
    description: "Set of 4 marble coasters with cork backing.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Kitchenware",
  },
  {
    id: "p10",
    name: "Brass Bookends",
    description: "Modern geometric brass bookends, set of 2.",
    price: 15,
    image: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Office",
  },
  {
    id: "p11",
    name: "Ceramic Plant Pot",
    description: "Handmade ceramic plant pot with drainage hole.",
    price: 11,
    image:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Plants",
  },
  {
    id: "p12",
    name: "Wall Mirror",
    description: "Round wall mirror with minimal metal frame.",
    price: 14,
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    category: "Home Decor",
  },
]

