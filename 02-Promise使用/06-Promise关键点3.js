/**
 *
 *  4. promise.then()返回的新promise的结果状态由什么决定？ 【核心关键】
 *      （1）简单表达：由then()指定的回调函数执行的结果决定
 *      （2）复杂表达：
 *            2.1 如果抛出异常，新promise变为rejected，reason为抛出异常
 *            2.2 如果返回的是非promise的任意值, 新promise变为resolved, value为返回的值
 *            2.3 如果返回的是另一个新promise, 此promise的结果就会成为新promise的结果  （return Promise.resolve(3)）
 *
 *  Note： .then()返回的就是一个新的Promise对象
 */
new Promise((resolve, reject) => {
  resolve(1)
  // reject(1)
}).then(
    value => {
      console.log('onResolved1()', value) // 没有return值，默认返回一个undefined ｜ return undefined === return Promise.resolve(undefined)
      // return 2
      // return Promise.resolve(3)
      // return Promise.reject(4)
      // throw 5
    },
    reason => {
      console.log('onRejected1()', reason)
      // return 2
      // return Promise.resolve(3)
      // return Promise.reject(4)
      // throw 5
    }
).then(
    value => {
      console.log('onResolved2()', value)
    },
    reason => {
      console.log('onRejected2()', reason)
    }
)
