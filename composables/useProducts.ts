import productsData from '~/data/products.json'

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
}

export interface Category {
  id: string
  name: string
  icon: string
}

export function useProducts() {
  const products = productsData.products as Product[]
  const categories = productsData.categories as Category[]

  const getProductById = (id: string): Product | undefined => {
    return products.find(p => p.id === id)
  }

  const getProductsByCategory = (categoryId: string): Product[] => {
    return products.filter(p => p.category === categoryId)
  }

  const getFeaturedProducts = (limit: number = 8): Product[] => {
    // Return products with badges first, then by rating
    return [...products]
      .sort((a, b) => {
        if (a.badge && !b.badge) return -1
        if (!a.badge && b.badge) return 1
        return b.rating - a.rating
      })
      .slice(0, limit)
  }

  const getAllProducts = (): Product[] => {
    return products
  }

  const getAllCategories = (): Category[] => {
    return categories
  }

  return {
    products,
    categories,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getAllProducts,
    getAllCategories,
  }
}
