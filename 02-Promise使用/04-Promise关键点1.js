/**
 *
 *   1. 如何改变Promise对象的状态？
 *    （1）resolve(value): 如果当前是pending，则变为resolved
 *    （2）reject(reason): 如果当前是pending，则变为rejected
 *    （3）抛出异常：如果当前是pending，则变为rejected
 *
 *   2. 一个Promise指定多个成功/失败的回调函数，都会调用吗？
 *      当Promise改变对应状态时都会调用
 *
 */

const p = new Promise((resolve, reject) => {
  resolve(1)
  // reject(2)
  // throw new Error('Errow things happen') // 抛出异常，promise变为rejected失败状态，reason为抛出的error
})

p.then(
    value => {
      console.log('value1', value)
    },
    reason => {
      console.log('reason1', reason)
    }
)

// 一个Promise对象可以指定多个成功和失败的回调函数
p.then(
    value => {
      console.log('value2', value)
    },
    reason => {
      console.log('reason2', reason)
    }
)
