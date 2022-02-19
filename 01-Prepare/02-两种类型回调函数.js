/**
 *  回调函数： 定义，没调用，但执行了； 被作为参数传递的函数
 *
 *  分类：
 *  （1）同步回调：
 *      理解：立即执行，执行完了才结束，不会放入回调队列中
 *      例子：数组遍历的相关回调函数 ｜  Promise中的excutor函数
 *
 *  （2）异步回调：
 *      理解：不会立即执行，会放入回调队列中，将来执行
 *      例子：定时器 ｜ ajax回调 ｜ Promise成功、失败问题
 *
 */

// Note： 回调函数的同步异步，取决于API的同步异步


// 1. 同步回调函数
const arr = [1,2,3]
arr.forEach(item => {  // 同步回调会立即执行
  console.log(item)
})
console.log("forEach之后")

// 2. 异步回调函数
setTimeout(() => { // 异步回调，会一上来就执行
  console.log('Timeout callback()')
}, 0)
console.log('Timeout之后, 但比Timeout先执行')
