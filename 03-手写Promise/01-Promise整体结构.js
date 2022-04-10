/**
 *  自定义Promise  ES5定义模块：通过函数表达式自调用IIFE
 *
 */
(function () {
  /**
   * Promise 构造函数， 参数是一个executor执行器函数（同步）
   * @param executor
   * @constructor
   */
  function Promise(executor) {

  }

  /**
   * 原型对象的方法
   * @param onResolved
   * @param onRejected
   * @return {promise}
   */
  Promise.prototype.then = function (onResolved, onRejected) {

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
