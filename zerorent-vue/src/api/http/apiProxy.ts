import { ApiProxy } from '@/types'
import { AxiosInstance, AxiosRequestConfig } from 'axios'

const pending = new Set()
const waitQueue = new Map()

/**
 * @description 生成hash标识符
 * @param str
 */
function hasCode(str: String) {
  let hash = 0,
    i,
    chr
  if (Number(str) === 0) return hash
  for (i = 0; i < str.length; i++) {
    chr = str.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0
  }
}

function handleReq(method, args, fn) {
  const hash = hasCode(`${method}${JSON.stringify(args)}`)
  if (pending.has(hash)) {
    const waitArr: [] = waitQueue.get(hash) || []
    waitQueue.set(hash, [
      ...waitArr,
      {
        fn,
        createTime: new Date().getTime(),
      },
    ])
  } else {
    fn()
    pending.add(hash)
  }
}

function handleRes(method, args, res) {
  const hash = hasCode(`${method}${JSON.stringify(args)}`)
  if (pending.has(hash)) {
    // 清空等待的请求
    const repeatReq = waitQueue.get(hash) || []
    repeatReq.forEach((v) => {
      v.fn(res)
    })
    waitQueue.set(hash, [])
  }
}

function HttpWrapper(fn: AxiosInstance) {
  console.log('23333')
  const api: any = {}
  api.get = async (...args: [string, AxiosRequestConfig<any>]) => {
    return new Promise((resolve, reject) => {
      return new Promise((resolve, reject) => {
        handleReq('get', args, (res) => {
          if (res) {
            resolve(res)
          }
          fn.get(...args)
            .then((res) => {
              handleRes('get', args, res)
              resolve(res)
            })
            .catch((err) => {
              handleRes('get', args, err)
              reject(err)
            })
        })
      })
    })
  }

  api.post = (...args: [string, AxiosRequestConfig<any>]) => {
    return new Promise((resolve, reject) => {
      fn.post(...args)
        .then((res) => {
          resolve(res)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
  return api
}

export default HttpWrapper
