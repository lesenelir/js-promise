let p1 = new Promise((resolve, reject) => {
  resolve(1)
})

let p2 = new Promise((resolve, reject) => {
  resolve(2)
})

const pAll = Promise.all([p1, p2, 5])
pAll.then(
    value => {
      console.log(value) // [1, 2, 5] // 顺序和执行顺序无关，只和数组中的顺序有关
    },
    reason => {
      console.log(reason)
    }
)


// finally
// 1. 无论外面的promise成功还是失败，都要走 并且回调不带参数
// 2. 正常走finally之后then 或者 catch
// 3. 如果finally 内部有promise 并且有延时处理，整个finally会等待
// 4. 如果两个都是成功，则取外面的结果
// 5. 如果外面是成功，里面是失败，取里面失败的结果（失败）
// 6. 如果外面是失败，里面是成功，则取外面失败的结果（失败）
// 7. 如果外面是失败，里面是失败，则取【里面】失败的结果
