/**
 * @description 路由权限认证
 * @author 小天
 */

import { defineStore } from "pinia";

export const useAuthStore = defineStore('auth', () => {
    
}, {
    persist: {
        key: '_auth',
        storage: localStorage
    }
})