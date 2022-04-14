/**
 * Promise all
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
  constructor(executor) {
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
  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
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

  // 函数对象的all方法
  static all(promiseArr) {
    return new MyPromise((resolve, reject) => {
      let resArr = new Array(promiseArr.length) // 最大的长度
      let resIndex = 0
      promiseArr.map((promise, index) => { // map和forEach都可以
        if (isPromise(promise)) {
          promise.then((value) => {
            formatResArr(value, index, resolve)
          }, reject)
        } else {
          formatResArr(promise, index, resolve)
        }
      })

      // 判断一个遍变量是否是promise
      // 首先得失引用类型，并且 该变量调用then方法后的typeof是function
      function isPromise(x) {
        if ((typeof x === 'object' && typeof x != null) || typeof x === "function") {
          let then = x.then
          return typeof then === 'function';
        } else {
          return false
        }
      }

      // 放入函数
      function formatResArr(value, index, resolve) { // 通过index下标顺序放入，和执行顺序无关
        resArr[index] = value
        // 如果全部成功了则return promise改变成功
        if (++resIndex === promiseArr.length) {
          resolve(value)
        }
      }
    })
  }

  // 函数对象的race 方法 （谁先有）


}

export default MyPromise
