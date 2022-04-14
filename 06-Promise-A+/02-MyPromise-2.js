/**
 * 处理Promise执行器函数中的异步操作 与多次调用的问题
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


}

export default MyPromise

