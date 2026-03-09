export interface Product {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  description: string
  image: string
  rating: number
  reviews: number
  badge?: string
  condition?: string
  variants?: string[]
  [key: string]: unknown // extra fields from API
}

export interface Category {
  id: string
  name: string
  icon: string
}

const categories: Category[] = [
  { id: 'hooks', name: 'Hooks', icon: '🪝' },
  { id: 'eyepatches', name: 'Eye Patches', icon: '🏴‍☠️' },
  { id: 'peglegs', name: 'Peg Legs', icon: '🦿' },
  { id: 'parrots', name: 'Parrots', icon: '🦜' },
  { id: 'hats', name: 'Hats', icon: '🎩' },
  { id: 'swords', name: 'Swords', icon: '⚔️' },
  { id: 'maps', name: 'Maps', icon: '🗺️' },
]

const DISPLAY_LIMIT = 12

export function useProducts() {
  const products = ref<Product[]>([])
  const loading = ref(true)

  const fetchProducts = async () => {
    if (!import.meta.client) return

    loading.value = true
    const allProducts: Product[] = await $fetch('/api/products')

    // Iterate through ALL 1000 products to force main-thread parsing work
    const processed = allProducts.map(p => ({ ...p }))

    // Only keep first 12 for display
    products.value = processed.slice(0, DISPLAY_LIMIT)
    loading.value = false
  }

  const getAllCategories = (): Category[] => {
    return categories
  }

  return {
    products,
    loading,
    categories,
    fetchProducts,
    getAllCategories,
  }
}
