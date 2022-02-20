/**
 *
 *  Promise是什么：
 *    JS解决异步编程的一种新方案 (旧： 纯回调形式)
 *    语法上讲，Promise是一个构造函数
 *    功能上讲，Promise用来封装一个异步操作，并获取结果
 *
 *  Promise状态改变： （两种改变，但一个Promise对象只能改变一次）
 *    pending -> resolved  成功数据value
 *    pending -> rejected  失败数据reason
 *
 */

// 1. 创建一个Promise对象
const p = new Promise((resolve, reject) => { // 执行器函数（同步回调）
  console.log("Promise代码段中异步任务之前------执行器executor函数执行") // 先执行。执行期函数是同步回调
  // 2. 执行异步操作
  setTimeout(() => {
    const time = Date.now()
    if (time % 2 === 0) {
      // 3.1 成功 执行resolve(value)
      resolve('成功的数据, time=' + time)
    } else {
      // 3.2 失败 执行reject(reason)
      reject('失败的数据, time=' + time)
    }

  }, 0)
})
console.log("new Promise 之后")

// 此时Promise对象状态发生了改变

// 4. 根据Promise对象的不同状态执行回调函数
// 由于定时器时间为0秒，此时已经在异步任务结束之后执行回调函数
p.then(
    value => {
      console.log('成功的回调', value) // 接受到成功的数据， onResolved
    },
    reason => {
      console.log('失败的回调', reason) // 接受到失败的数据， onRejected
    }
)

// Note： Promise回调函数的函数体是同步代码，会立即执行，返回一个promise结果，then根据结果执行对应的回调函数
// 纯回调函数是在异步任务之前执行，执行完销毁；promise回调函数可以在异步任务执行之后指定，设立但不用立即调用

