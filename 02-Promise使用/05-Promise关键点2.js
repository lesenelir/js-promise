/**
 *  3. 改变Promise状态和指定回调函数谁先谁后？
 *    （1）都有可能，正常情况下，是先指定回调函数，再改变状态，但也可以先改变状态，再指定回调函数（纯回调函数先指定回调函数）
 *     (2) 如何先改变状态再指定回调函数？
 *        2.1 在执行器中直接调用resolve()/reject()
 *        2.2 延长更长时间才调用then()
 *     (3)什么时候才能得到数据？
 *        3.1 如果先指定的回调，当状态发生改变时，回调函数就会调用，得到数据
 *        3.2 如果先改变的状态，当指定回调时，回调函数就会调用，得到数据
 */


// Note： 执行器函数里有异步回调，则先指定回调函数后改变状态；
//        执行器函数里没有异步回调，则先改变状态，再指定回调函数，并立即执行回调函数 （2.1）


// 常规：先指定回调函数，后改变状态
new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(1) // 后改变状态（同时指定数据），异步执行回调函数
  }, 1000)
}).then( // 先指定回调函数，保存当前指定的回调函数
    value => {
      console.log('value', value)
    },
    reason => {
      console.log('reason', reason)
    }
)

console.log("=======================================")
// 先该状态再执行回调函数方法：

// 1. 执行器函数执行调用resolve() reject()
new Promise((resolve, reject) => {
  resolve(2) // 先改变状态，同时指定数据
}).then( // 后指定回调函数，异步执行回调函数
    value => {
      console.log('value2', value)
    },
    reason => {
      console.log('reason2', reason)
    }
)

// 2. 延长更长时间才调用then()
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(3)
  }, 2000)
})

setTimeout(() => {
  p.then(
      value => {
        console.log('value3', value)
      },
      reason => {
        console.log('reason3', reason)
      }
  )
}, 2100)


// Note： .then()方法是同步的，.then()内部的回调是异步的
