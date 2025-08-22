import { AxiosRequestConfig } from "axios"

export interface ApiProxy {
    get: <T>(config: AxiosRequestConfig) => Promise<T>
    post: Function
    delete: Function
    put: Function
}