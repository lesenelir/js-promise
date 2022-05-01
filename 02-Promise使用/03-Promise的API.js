/*
   1. Promise构造函数: Promise (executor) {}
       executor函数: 同步执行  (resolve, reject) => {}
       resolve函数: 内部定义成功时我们调用的函数 value => {}
       reject函数: 内部定义失败时我们调用的函数 reason => {}
       说明: executor会在Promise内部立即同步回调,异步操作在执行器中执行

   2. Promise.prototype.then方法: (onResolved, onRejected) => {}
       onResolved函数: 成功的回调函数  (value) => {}
       onRejected函数: 失败的回调函数 (reason) => {}
       说明: 指定用于得到成功value的成功回调和用于得到失败reason的失败回调
             返回一个新的promise对象

   3. Promise.prototype.catch方法: (onRejected) => {}
       onRejected函数: 失败的回调函数 (reason) => {}
       说明: then()的语法糖, 相当于: then(undefined, onRejected)
             catch也是返回一个新的Promise对象

   4. Promise.resolve方法: (value) => {}
       value: 成功的数据或promise对象
       说明: 返回一个成功/失败的promise对象

   5. Promise.reject方法: (reason) => {}
       reason: 失败的原因
       说明: 返回一个失败的promise对象

   6. Promise.all方法: (promises) => {}
       promises: 包含n个promise的数组
       说明: 返回一个新的promise, 只有所有的promise都成功才成功, 只要有一个失败了就直接失败
   7. Promise.race方法: (promises) => {}
       promises: 包含n个promise的数组
       说明: 返回一个新的promise, 第一个完成的promise的结果状态就是最终的结果状态
 */


// new Promise((resolve, reject) => {
//   // 执行异步操作
//   setTimeout(() => {
//     // resolve('成功的回调')
//     reject('失败的回调')  // Promise对象状态只发生一次改变，所以能写一个
//   }, 0)
// }).then(
//     value => {
//       console.log('onResolved()')
//     },
// ).catch(
//     reason => {
//       console.log('onRejected()')
//     }
// )

// 产生一个成功值为1的Promise对象
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1)
  }, 1000)
})

const p2 = Promise.resolve(2) // 语法糖写法
const p3 = Promise.reject(3)

// p1.then(value => {console.log(value)})
// p2.then(value => {console.log(value)})
// p3.catch(reason => {console.log(reason)})
// p3.then(undefined, reason => {console.log(reason)})


// 返回一个新的Promise 查看所有的Promise
// const pAll = Promise.all([p1, p2, 3]) // 请求都成功了才处理
// pAll.then(
//     value => {
//       console.log('all onResolved()')
//       console.log(value)
//     },
//     reason => {
//       console.log('all onRejected()')
//     }
// )


// 返回一个新的Promise 只看第一个完成的结果状态
const pRace = Promise.race( [p1, p3])
pRace.then(
    value => {
      console.log('race onResolved()')
      console.log(value)
    },
    reason => {
      console.log('race onRejected()')
      console.log(reason)
    }
)





