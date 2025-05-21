export interface Category {
    id: string
    name: string
    slug: string
    parentId?: string | null
    children?: Category[]
}

export interface ProductImage {
    id: string
    url: string
    productId: string
}

export interface Product {
    id: string
    name: string
    slug: string
    description?: string
    price: number
    categoryId: string
    category?: Category
    images?: ProductImage[]
}

export interface CartItem {
    product: Product
    quantity: number
}

export interface OrderItem {
    productId: string
    quantity: number
    unitPrice: number
}

export interface Order {
    id: string
    total: number
    status: string
    items: OrderItem[]
}
