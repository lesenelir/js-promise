/**
 *  自定义Promise  ES5定义模块：通过函数表达式自调用IIFE
 *
 */
(function () {

  const PENDING = 'pending'
  const RESOLVED = 'resovled'
  const REJECTED = 'rejected'

  /**
   * Promise 构造函数， 参数是一个executor执行器函数（同步）
   * @param executor
   * @constructor
   */
  function Promise(executor) {
    // 将promise存储起来
    const self = this
    self.status = PENDING  // 给promise实例对象指定状态
    self.data = undefined  // 给promise对象指定一个用于存储结果数据的属性
    self.callbacks = []    // 每个元素的结构: { onResolved() {}, onRejected() {}}

    function resolve(value) {
      if (self.status !== PENDING) {  // 如果当前状态不是pending 直接返回
        return
      }

      self.status = RESOLVED
      self.data = value
      // 如果有待执行的callback函数，立即异步执行回调函数onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => { // 放入队列中，执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onResolved(value)
          })
        })
      }
    }

    function reject(reason) {
      if (self.status !== PENDING) {  // 如果当前状态不是pending 直接返回
        return
      }

      self.status = REJECTED
      self.data = reason
      // 如果有待执行的callback函数，立即异步执行回调函数onResolved
      if (self.callbacks.length > 0) {
        setTimeout(() => { // 放入队列中，执行所有成功的回调
          self.callbacks.forEach(callbacksObj => {
            callbacksObj.onRejected(reason)
          })
        })
      }
    }

    // 立即同步执行executor
    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  /**
   * 原型对象的方法
   * @param onResolved
   * @param onRejected
   * @return {promise}
   */
  Promise.prototype.then = function (onResolved, onRejected) {
    const self = this

    self.callbacks.push({
      onResolved,
      onRejected
    })


  }

  /**
   * 原型对象的方法
   * @param onRejected
   * @return {promise}
   */
  Promise.prototype.catch = function (onRejected) {

  }

  /**
   * 函数对象的方法
   * @param value
   * @return {promise} 指定value的promise对象
   */
  Promise.resolve = function (value) {

  }

  /**
   * 函数对象的方法
   * @param reason 指定reason失败的promise对象
   */
  Promise.reject = function (reason) {

  }

  /**
   * 函数对象的方法
   * @param promises
   * @return {promise} 只有所有promise都成功才成功，否则失败
   */
  Promise.all = function (promises) {

  }

  /**
   * 函数对象的方法
   * @param promises
   * @return {promise} 结果由第一个完成的promise对象状态确定
   */
  Promise.race = function (promises) {

  }


  // 向外暴露Promise函数
  window.Promise = Promise
})(window)



