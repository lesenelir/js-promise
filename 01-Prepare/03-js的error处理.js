/**
 *  目标: 进一步理解JS中的错误(Error)和错误处理
 *      mdn文档: https: //developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
 *
 *  1. 错误的类型
 *     Error: 所有错误的父类型
 *     ReferenceError: 引用的变量不存在
 *     TypeError: 数据类型不正确的错误
 *     RangeError: 数据值不在其所允许的范围内
 *     SyntaxError: 语法错误
 *
 *   2. 错误处理
 *     捕获错误: try ... catch
 *     抛出错误: throw error
 *
 *   3. 错误对象
 *     message属性: 错误相关信息
 *     stack属性: 函数调用栈记录信息
 */


// 常见的内置错误
//  1.  ReferenceError: 引用的变量不存在 【常见】
// console.log(a) // ReferenceError: a is not defined

//  2. TypeError: 数据类型不正确的错误  【常见】
// let b = {}
// b.xx() // TypeError: b.xx is not a function

//  3. RangeError: 数据值不在其所允许的范围内
// function fn() { // RangeError: Maximum call stack size exceeded
//   fn() // 递归
// }
// fn()

//  4. SyntaxError: 语法错误 ， 编辑器直接报错


console.log("==================")
// 错误处理
// 1. 捕获错误
try {
  let d
  console.log(d.xxx)
} catch (e) {
  console.log(e.message)
  // console.log(e.stack)
}

console.log('出错之后')

console.log("=================")

function fn() {
  if (Date.now() % 2 === 1) {
    console.log("当前时间为奇数，可以执行")
  } else {
    throw new Error("当前时间为偶数，无法执行")  // 抛出错误
  }
}

// 抛出错误后，需要捕获错误， 处理异常
try { // 捕获有可能出现错误的代码段
  fn()
} catch (e) {
  console.log(e.message)
}
