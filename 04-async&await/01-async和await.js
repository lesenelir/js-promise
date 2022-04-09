/**
 *  1. async 函数
 *    async function用来定义一个异步函数
 *    异步函数：通过事件循环异步执行的函数
 *    async函数的返回值是promise对象  return {promise}
 *    async函数返回的promise对象结果由async函数执行的返回值决定
 *
 *  2. await 表达式
 *    await 右侧的表达式一般为promise对象，但也可以是其他值
 *    await 返回的是promise要处理的结果
 *      如果表达式是promise对象，await返回的是【promise成功的值】
 *      如果表达是其他值，直接将此值作为await的返回值
 *    await 作用：可以去掉then繁琐的操作
 *
 *  3. 注意：
 *    await必须写在async函数中，但async函数中可以没有await
 *    如果await的promise失败了（onRejected），就会抛出异常，需要通过 try ... catch来捕获处理
 *
 */

// async 返回的是一个promise对象
async function fn1() {
  return 1
}

const result1 = fn1()
console.log(result1) // Promise { 1 }


async function fn2() {
  throw 2 // async返回一个失败的promise对象
}
const result2 = fn2()
result2.catch(
    reason => {
      console.log("onRejected()", 2)
    }
)

// 总结： async 返回的是一个promise对象（有成功、有失败）
async function fn() {
  // return 1
  // throw 2
  return Promise.resolve(3)
}

console.log("===========================================================")

// await使用
// 1. await得到成功的结果
async function fn3() {
  return Promise.resolve(3)
}

async function fn4() { // 使用await一定要用async函数
  // const value = fn3()
  // value.then(
  //     value => {
  //       console.log(value)
  //     }
  // )
  const value = await fn3()
  console.log(value)
}

fn4()

// 2. await得到失败的结果
// async 和 await 如果要得到失败的结果，需要用 try catch
async function fn5() {
  return Promise.reject(4)
}

async function fn6() {
  try {
    const value = await fn5()
    console.log("Value: ", value)
  } catch (e) {
    console.log("Error: ", e)
  }
}

fn6()
