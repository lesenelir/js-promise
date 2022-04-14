/**
 * resolve 与 reject 静态方法 构造函数的语法糖
 * @type {string}
 */

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {

  /**
   *
   * @param executor
   */
  constructor (executor) {
    this.status = PENDING
    this.value = undefined
    this.reason = undefined

    // 装所有成功的回调和失败的回调
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (value instanceof MyPromise) {
        value.then(resolve, reject)
        return
      }
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        // 发布
        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        // 发布
        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }

  }

  /**
   *
   * @param onFulfilled
   * @param onRejected
   */
  then (onFulfilled, onRejected) {
    let promise2


    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }

    if (this.status === REJECTED) {
      onRejected(this.reason)
    }

    if (this.status === PENDING) { // then 中函数稍后执行
      // 收集成功和失败的回调函数 （订阅过程）
      this.onFulfilledCallbacks.push(() => {
        onFulfilled(this.value)
      })
      this.onRejectedCallbacks.push(() => {
        onRejected(this.reason)
      })
    }

  }

  // 函数对象的resolve方法
  static resolve(value) {
    // 返回一个新的promise
    return new MyPromise((resolve, reject) => {
      resolve(value)
    })
  }

  // 函数对象的reject方法
  static reject(reason) {
    return new MyPromise((resolve, reject) => {
      reject(reason)
    })
  }



}

export default MyPromise
