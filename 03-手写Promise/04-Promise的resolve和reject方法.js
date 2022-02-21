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
    onResolved = typeof onResolved === 'function' ? onResolved : value => value // 向后传递成功的value
    // 指定默认的失败的回调(实现错误/异常传透的关键点)
    onRejected = typeof onRejected === 'function' ? onRejected : reason => {
      throw reason
    } // 抽后传递失败的reason

    const self = this

    // 返回一个新的proimise对象
    return new Promise((resolve, reject) => {

      /*
      调用指定回调函数处理, 根据执行结果, 改变return的promise的状态
      */
      function handle(callback) {
        /*
          1. 如果抛出异常, return的promise就会失败, reason就是error
          2. 如果回调函数返回不是promise, return的promise就会成功, value就是返回的值
          3. 如果回调函数返回是promise, return的promise结果就是这个promise的结果
           */
        try {
          const result = callback(self.data)
          // 3. 如果回调函数返回是promise, return的promise结果就是这个promise的结果
          if (result instanceof Promise) {
            result.then(
                value => resolve(value), // 当result成功时, 让 return的promise也成功
                reason => reject(reason) // 当result失败时, 让 return的promise也失败
            )
            // result.then(resolve, reject)
          } else {
            // 3. 如果回调函数返回不是promise, return的promise就会成功, value就是返回的值
            resolve(result)
          }

        } catch (error) {
          // 1. 如果抛出异常, return的promise就会失败, reason就是error
          reject(error)
        }
      }

      // 当前状态还是pending状态, 将回调函数保存起来
      if (self.status === PENDING) {
        self.callbacks.push({
          onResolved(value) {
            handle(onResolved)
          },
          onRejected(reason) {
            handle(onRejected)
          }
        })
      } else if (self.status === RESOLVED) { // 如果当前是resolved状态, 异步执行onResolved并改变return的promise状态
        setTimeout(() => {
          handle(onResolved)
        })
      } else { // 如果当前是rejected状态, 异步执行onRejected并改变return的promise状态
        setTimeout(() => {
          handle(onRejected)
        })
      }
    })

  }

  /**
   * 原型对象的方法
   * @param onRejected
   * @return {promise}
   */
  Promise.prototype.catch = function (onRejected) {
    return this.then(undefined, onRejected)
  }

  /**
   * 函数对象的方法
   * @param value
   * @return {promise} 指定value的promise对象
   */
  Promise.resolve = function (value) {
    // 返回一个成功/失败的promise
    return new Promise((resolve, reject) => {
      // value是promise
      if (value instanceof Promise) { // 使用value的结果作为promise的结果
        value.then(resolve, reject)
      } else { // value不是promise  => promise变为成功, 数据是value
        resolve(value)
      }
    })
  }

  /**
   * 函数对象的方法
   * @param reason 指定reason失败的promise对象
   */
  Promise.reject = function (reason) {
    // 返回一个失败的promise
    return new Promise((resolve, reject) => {
      reject(reason)
    })
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



