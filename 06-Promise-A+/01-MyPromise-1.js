/**
 * 主要对于Promise构造函数的搭建，以及 then 的初步构建
 * @type {string}
 */

const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

class MyPromise {
  constructor(executor) {
    this.status = PENDING // this指向new出来的实例
    this.value = undefined
    this.reason = undefined

    const resolve = (value) => {
      if (this.status === PENDING) { // 只有在pending状态下才改变状态
        this.status = FULFILLED
        this.value = value
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
      }
    }

    // 使用try catch 是为了可以在executor中捕获 new Error
    try {
      executor(resolve, reject) // new Promise的时候会立即执行executor函数
    } catch (e) {
      reject(e)
    }

  }

  then(onFulfilled, onRejected) {
    if (this.status === FULFILLED) {
      onFulfilled(this.value)
    }
    if (this.status === REJECTED) {
      onRejected(this.reason)
    }
  }

}

export default MyPromise

