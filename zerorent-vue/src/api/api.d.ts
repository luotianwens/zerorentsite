
interface ResListTy {
    page: number
    limit: number
    total: number
}

interface ResSubmitTy {
    status: string
    message: string
    received_data: any
}

// 1. 定义用户对象类型
type User = {
  id: number
  name: string
}

type OrderStatus = 'undo' | 'doing' | 'done' | 'dealing?'

interface OrderItem {
  id: number
  name: string
  description: string
  price: number
  stat: OrderStatus // 使用预定义的状态类型
  date: string
  publisher: User // 复用用户类型
  worker: User | null // 复用用户类型
  phone?: number
  publisher_name?: {
    id: number
    name: string
  }
  worker_name?: {
    id: number
    name: string
  }
}

export interface GetOrders extends ResListTy {
    data: OrderItem[]
}

export interface DevelopersTy extends ResListTy {
    data: {
        id: string
        username: string
    }[]
}

// login
export interface LoginDataTy {
    username: string
    password: string
}

export interface UserInfoTy extends ResSubmitTy {
    data: {
        id: string
        username: string
    }
}

// register
export interface RegisterDataTy {
    name: string
    password: string
    email: string
    phone: string
}

export interface RegisterTy extends ResSubmitTy {
    
}

export interface PostOrderDataTy {
    name: string
    description: string
    price: number
    publisher_id: string
}

export interface PostOrderTy extends ResSubmitTy {

}