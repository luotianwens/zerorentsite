
import http from './http/index'
import { DevelopersTy, GetOrders, LoginDataTy, PostOrderDataTy, PostOrderTy, RegisterDataTy, RegisterTy, UserInfoTy } from './api'

const APIS = '/apis'

export const handleGetOrders = (): Promise<GetOrders> => http.get(`${APIS}/getOrders`)


export const handleGetDevelopers = (): Promise<DevelopersTy> => http.get(`${APIS}/getDevelopers`)


export const handleLogin = (data: LoginDataTy): Promise<UserInfoTy> => http.post(`${APIS}/login`, data)

export const handleRegister = (data: RegisterDataTy): Promise<RegisterTy> => http.post(`${APIS}/register`, data)

export const handlePostOrder = (data: PostOrderDataTy): Promise<PostOrderTy> => http.post(`${APIS}/postOrder`, data)
